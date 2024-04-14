import { authAPI, ResultCodeEnum } from 'api'
import { createAppAsyncThunk, handleServerError, handleNetworkError } from 'utils'
import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'state/reducers/app-reducer'

//========================================================================================

export type AuthReducerType = { isLogged: boolean }

//========================================================================================

const authSetLoggedTC = createAppAsyncThunk<undefined,
	{ email: string, password: string, rememberMe: boolean, captcha: boolean }>(
	'authReducer/authSetLoggedTC',
	async ({ email, password, rememberMe, captcha }, { dispatch, rejectWithValue }) => {
		dispatch(appActions.setStatus({ status: 'loading' }))
		try {
			const res = await authAPI.login(email, password, rememberMe, captcha)
			if (res.data.resultCode === ResultCodeEnum.Success) {
				dispatch(appActions.setStatus({ status: 'idle' }))
				return
			} else {
				handleServerError(res.data.messages, dispatch)
				return rejectWithValue(null)
			}
		} catch (error) {
			handleNetworkError(error, dispatch)
			return rejectWithValue(null)
		}
	}
)

const authIsInitializedTC = createAppAsyncThunk<undefined, undefined>(
	'authReducer/authIsInitializedTC',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const res = await authAPI.me()
			if (res.data.resultCode === ResultCodeEnum.Success) {
				return
			} else {
				return rejectWithValue(null)
			}
		} catch (error) {
			// нет нужды выключать loader, так как мы его и не включали
			// в этой утилите он отключается, но дублировать код обработки ошибки не хочется
			handleNetworkError(error, dispatch)
			return rejectWithValue(null)
		} finally {
			dispatch(appActions.setAppIsInitialized({ isAppInitialized: true }))
		}
	}
)

const authLogoutTC = createAppAsyncThunk<undefined, undefined>(
	'authReducer/authLogoutTC',
	async (_, { dispatch, rejectWithValue }) => {
		dispatch(appActions.setStatus({ status: 'loading' }))
		try {
			const res = await authAPI.logout()
			if (res.data.resultCode === ResultCodeEnum.Success) {
				dispatch(appActions.setStatus({ status: 'idle' }))
				return
			} else {
				handleServerError(res.data.messages, dispatch)
				return rejectWithValue(null)
			}

		} catch (error) {
			handleNetworkError(error, dispatch)
			return rejectWithValue(null)
		}
	}
)

//========================================================================================

const initialState: AuthReducerType = {
	isLogged: false
}

const slice = createSlice({
	name: 'authReducer',
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



