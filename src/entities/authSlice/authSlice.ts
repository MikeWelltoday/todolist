import { appActions } from 'state/appSlice/appSlice'
import { AppDispatch } from 'state/store/store'
import { authApi, AuthLoginResponse, AuthResponse, MeResponse } from 'entities/authSlice/api/auth.api'
import { ResultCodeEnum, SlicesNames } from 'shared'
import { createAppSlice } from 'state'
import { securityAPI } from 'entities/authSlice/api/security.api'

//========================================================================================

export type AuthSlice = ReturnType<typeof slice.getInitialState>

//========================================================================================

const slice = createAppSlice({
	name: SlicesNames.authSlice,
	initialState: {
		isLogged: false as boolean,
		captchaUrl: null as string | null
	},
	reducers: (creators) => {
		return {

			initializationThunk: creators.asyncThunk<undefined, undefined,
				{ rejectValue: AuthResponse<MeResponse> }>(
				async (_, thunkAPI) => {
					const dispatch = thunkAPI.dispatch as AppDispatch
					const res = await authApi.me()
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
				{ rejectValue: AuthLoginResponse }>(
				async ({ email, password, rememberMe, captcha }, thunkAPI) => {
					const dispatch = thunkAPI.dispatch as AppDispatch
					const res = await authApi.login(email, password, rememberMe, captcha)
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

			logoutThunk: creators.asyncThunk<undefined, undefined, { rejectValue: AuthResponse }>(
				async (_, thunkAPI) => {
					const res = await authApi.logout()
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
	},

	selectors: {
		selectCaptcha: (sliceState) => sliceState.captchaUrl,
		selectIsLogged: (sliceState) => sliceState.isLogged
	}

})

//========================================================================= ===============

/**
 * ⛔ SLICE     импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ THUNKS    импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ ACTIONS   импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ SELECTORS импортировать напрямую из файла => если черещ index, то будет ошибка
 */

export const authSlice = slice.reducer
export const authActions = slice.actions
export const authSelectors = slice.selectors






