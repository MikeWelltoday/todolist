import { appActions } from 'state/appSlice/appSlice'
import { AppDispatchType } from 'state/store/store'
import { authAPI, AuthLoginResponseType, AuthResponseType, MeResponseType } from 'entities/authSlice/api/authAPI'
import { ResultCodeEnum } from '../../shared'
import { createAppSlice } from '../../state'
import { securityAPI } from './api/securityAPI'

//========================================================================================

export type AuthSliceType = {
	isLogged: boolean
	captchaUrl: string | null
}

//========================================================================================

const initialState: AuthSliceType = {
	isLogged: false,
	captchaUrl: null
}

const slice = createAppSlice({
	name: 'authSlice',
	initialState,
	reducers: (creators) => {
		return {

			initializationThunk: creators.asyncThunk<undefined, undefined,
				{ rejectValue: AuthResponseType<MeResponseType> }>(
				async (_, thunkAPI) => {
					const dispatch = thunkAPI.dispatch as AppDispatchType
					const res = await authAPI.me()
					dispatch(appActions.setInitializationAction({ isAppInitialized: true }))
					if (res.data.resultCode === ResultCodeEnum.Success) {
						return
					} else {
						return thunkAPI.rejectWithValue(res.data)
					}
				}, {
					fulfilled: (state) => {
						state.isLogged = true
					}
				}),

			loginThunk: creators.asyncThunk<undefined,
				{ email: string, password: string, rememberMe: boolean, captcha: string },
				{ rejectValue: AuthLoginResponseType }>(
				async ({ email, password, rememberMe, captcha }, thunkAPI) => {
					const dispatch = thunkAPI.dispatch as AppDispatchType
					const res = await authAPI.login(email, password, rememberMe, captcha)
					if (res.data.resultCode === ResultCodeEnum.Success) {
						return
					} else if (res.data.resultCode === ResultCodeEnum.Captcha) {
						// нужно сделать запрос за captcha
						dispatch(authActions.captchaThunk())
						// и отправить ошибку в UI, там она отобразиться в поле captcha
						return thunkAPI.rejectWithValue(res.data)
					} else {
						return thunkAPI.rejectWithValue(res.data)
					}
				}, {
					fulfilled: (state) => {
						state.isLogged = true

						// если логинизация была через каптчу, нужно её занулить
						state.captchaUrl = ''
					}
				}
			),

			logoutThunk: creators.asyncThunk<undefined, undefined, { rejectValue: AuthResponseType }>(
				async (_, thunkAPI) => {
					const res = await authAPI.logout()
					if (res.data.resultCode === ResultCodeEnum.Success) {
						return
					} else {
						return thunkAPI.rejectWithValue(res.data)
					}
				}, {
					fulfilled: (state) => {
						state.isLogged = false
					}
				}),

			captchaThunk: creators.asyncThunk<{ captchaUrl: string }, undefined>(
				async (_, thunkAPI) => {
					const res = await securityAPI.getCaptcha()
					return { captchaUrl: res.data.url }
				}, {
					// получим каптчу с сервера в случае ошибки и поместим в стейт
					fulfilled: (state, action) => {
						state.captchaUrl = action.payload.captchaUrl
					}
				}
			)
		}
	}
})

//========================================================================================

/**
 * ⛔ SLICE   импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ THUNKS  импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ ACTIONS импортировать напрямую из файла => если черещ index, то будет ошибка
 */
export const authSlice = slice.reducer
export const authActions = slice.actions



