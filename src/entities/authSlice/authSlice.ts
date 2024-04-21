import { appActions } from 'state/appSlice/appSlice'
import { AppDispatchType } from 'state/store/store'
import { authAPI, AuthLoginResponseType, AuthResponseType, MeResponseType } from 'entities/authSlice/authAPI'
import { ResultCodeEnum } from '../../shared'
import { createAppSlice } from '../../state'

export type AuthSliceType = { isLogged: boolean }

const initialState: AuthSliceType = {
	isLogged: false
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
				{ email: string, password: string, rememberMe: boolean, captcha: boolean },
				{ rejectValue: AuthLoginResponseType }>(
				async ({ email, password, rememberMe, captcha }, thunkAPI) => {
					const res = await authAPI.login(email, password, rememberMe, captcha)
					if (res.data.resultCode === ResultCodeEnum.Success) {
						return
					} else {
						return thunkAPI.rejectWithValue(res.data)
					}
				}, {
					fulfilled: (state) => {
						state.isLogged = true
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
				})

		}
	}
})

/**
 * ⛔ SLICE   импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ THUNKS  импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ ACTIONS импортировать напрямую из файла => если черещ index, то будет ошибка
 */
export const authSlice = slice.reducer
export const authActions = slice.actions



