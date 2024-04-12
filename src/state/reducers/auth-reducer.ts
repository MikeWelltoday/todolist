import { authAPI, ResultCodeEnum } from 'api'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'utils'
import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'state/reducers/app-reducer'

//========================================================================================

export type AuthReducerType = { isLogged: boolean }

//========================================================================================


const authSetLoggedTC = createAppAsyncThunk<{},
	{ email: string, password: string, rememberMe: boolean, captcha: boolean }>(
	'auth/authSetLoggedTC',
	async ({ email, password, rememberMe, captcha }, thunkAPI) => {
		thunkAPI.dispatch(appActions.setStatus({ status: 'loading' }))
		try {
			const res = await authAPI.login(email, password, rememberMe, captcha)
			if (res.data.resultCode === ResultCodeEnum.Success) {
				thunkAPI.dispatch(appActions.setStatus({ status: 'idle' }))
				return {}
			} else {
				handleServerAppError(res.data.messages, thunkAPI.dispatch)
				return thunkAPI.rejectWithValue(null)
			}
		} catch (error) {
			handleServerNetworkError(error, thunkAPI.dispatch)
			return thunkAPI.rejectWithValue(null)
		}
	}
)

const authIsInitializedTC = createAppAsyncThunk<{}, {}>(
	'auth/authIsInitializedTC',
	async ({}, thunkAPI) => {
		try {
			const res = await authAPI.me()
			if (res.data.resultCode === ResultCodeEnum.Success) {
				thunkAPI.dispatch(appActions.setAppIsInitialized({ isAppInitialized: true }))
				return {}
			} else {
				thunkAPI.dispatch(appActions.setAppIsInitialized({ isAppInitialized: true }))
				return thunkAPI.rejectWithValue(null)
			}
		} catch (error) {
			// нет нужды выключать loader, так как мы его и не включали
			// в этой утилите он отключается, но дублировать код обработки ошибки не хочется
			handleServerNetworkError(error, thunkAPI.dispatch)
			thunkAPI.dispatch(appActions.setAppIsInitialized({ isAppInitialized: true }))
			return thunkAPI.rejectWithValue(null)
		}
	}
)

const authLogoutTC = createAppAsyncThunk<{}, {}>(
	'auth/authLogoutTC',
	async ({}, thunkAPI) => {
		thunkAPI.dispatch(appActions.setStatus({ status: 'loading' }))
		try {
			const res = await authAPI.logout()
			if (res.data.resultCode === ResultCodeEnum.Success) {
				thunkAPI.dispatch(appActions.setStatus({ status: 'idle' }))
				return {}
			} else {
				handleServerAppError(res.data.messages, thunkAPI.dispatch)
				return thunkAPI.rejectWithValue(null)
			}

		} catch (error) {
			handleServerNetworkError(error, thunkAPI.dispatch)
			return thunkAPI.rejectWithValue(null)
		}
	}
)

//========================================================================================

const initialState: AuthReducerType = {
	isLogged: false
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(authSetLoggedTC.fulfilled, (state) => {
				state.isLogged = true
			})
			.addCase(authIsInitializedTC.fulfilled, (state) => {
				state.isLogged = true
			})
			.addCase(authLogoutTC.fulfilled, (state) => {
				state.isLogged = false
			})
	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { authSetLoggedTC, authIsInitializedTC, authLogoutTC }



