import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { appActions } from 'store/appSlice/appSlice'
import { AppDispatchType } from 'store/store'
import { authAPI, AuthLoginResponseType } from 'entities/authSlice/authAPI'
import { handleNetworkError, handleServerError, ResultCodeEnum, thunkTryCatch } from '../../shared'
import { createAppAsyncThunk } from '../../store/createAppAsyncThunk'

export type AuthReducerType = { isLogged: boolean }

const authSetLoggedTC = createAsyncThunk<
	undefined, { email: string, password: string, rememberMe: boolean, captcha: boolean },
	{ dispatch: AppDispatchType, rejectWithValue: null | AuthLoginResponseType }>(
	'authSlice/authSetLoggedTC',
	async ({ email, password, rememberMe, captcha }, { dispatch, rejectWithValue }) => {
		// dispatch(appActions.setStatus({ status: 'loading' }))
		try {
			const res = await authAPI.login(email, password, rememberMe, captcha)
			if (res.data.resultCode === ResultCodeEnum.Success) {
				// dispatch(appActions.setStatus({ status: 'idle' }))
				return
			} else {
				handleServerError(res.data.messages, dispatch, false)
				return rejectWithValue(res.data)
			}
		} catch (error) {
			handleNetworkError(error, dispatch)
			return rejectWithValue(null)
		}
	}
)

const authIsInitializedTC = createAsyncThunk<undefined, undefined>(
	'authSlice/authIsInitializedTC',
	async (_, { dispatch, rejectWithValue }) => {
		const res = await authAPI.me()
			.finally(() => dispatch(appActions.setAppIsInitialized({ isAppInitialized: true })))
		if (res.data.resultCode === ResultCodeEnum.Success) {
			return
		} else {
			return rejectWithValue(res.data)
		}
	}
)

const authLogoutTC = createAppAsyncThunk<undefined, undefined>(
	'authSlice/authLogoutTC',
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		const logic = async () => {
			const res = await authAPI.logout()
			if (res.data.resultCode === ResultCodeEnum.Success) {
				// dispatch(appActions.setStatus({ status: 'idle' }))
				return
			} else {
				handleServerError(res.data.messages, dispatch)
				return rejectWithValue(null)
			}
		}
		return thunkTryCatch(thunkAPI, logic)
	}
)


// const authLogoutTC = createAppAsyncThunk<undefined, undefined>(
// 	'authSlice/authLogoutTC',
// 	async (_, { dispatch, rejectWithValue }) => {
// 		dispatch(appActions.setStatus({ status: 'loading' }))
// 		try {
// 			const res = await authAPI.logout()
// 			if (res.data.resultCode === ResultCodeEnum.Success) {
// 				dispatch(appActions.setStatus({ status: 'idle' }))
// 				return
// 			} else {
// 				handleServerError(res.data.messages, dispatch)
// 				return rejectWithValue(null)
// 			}
//
// 		} catch (error) {
// 			handleNetworkError(error, dispatch)
// 			return rejectWithValue(null)
// 		}
// 	}
// )

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

export const authSlice = slice.reducer
export const authThunks = { authSetLoggedTC, authIsInitializedTC, authLogoutTC }



