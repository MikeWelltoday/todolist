import { authAPI, ResultCode } from 'api'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatchType } from 'state/store'
import { appActions } from 'state/reducers/app-reducer'
import { todolistsActions } from 'state/reducers/todolists-reducer'

//========================================================================================

export type AuthReducerType = { isLogged: boolean }

//========================================================================================


const authSetLoggedTC = createAppAsyncThunk<{ isLogged: boolean },
	{ email: string, password: string, rememberMe: boolean, captcha: boolean }>(
	'auth/authSetLoggedTC',
	async ({ email, password, rememberMe, captcha }, thunkAPI) => {
		thunkAPI.dispatch(appActions.setStatus({ status: true }))
		try {
			const res = await authAPI.login(email, password, rememberMe, captcha)
			if (res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(appActions.setStatus({ status: true }))
				return { isLogged: true }
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
//
// const authIsInitializedTC = createAppAsyncThunk<{isLogged:boolean}, string>(
// 	'auth/authIsInitializedTC',
//
// )


export const authIsInitializedTC_ = () => async (dispatch: AppDispatchType) => {
	try {
		const res = await authAPI.me()
		if (res.data.resultCode === ResultCode.success) {
			dispatch(authActions.setIsLogged({ isLogged: true }))
		}
	} catch (error) {
		if (typeof error === 'string') {
			console.error(error)
		} else if (error instanceof Error) {
			console.error(error.message)
		}
	}
	dispatch(appActions.setAppIsInitialized({ isAppInitialized: true }))
}


//========================================================================================


const initialState: AuthReducerType = {
	isLogged: false
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {

		setIsLogged: (state, action: PayloadAction<{ isLogged: boolean }>) => {
			state.isLogged = action.payload.isLogged
		}
	},
	extraReducers: builder => {
		builder
			.addCase(authSetLoggedTC.fulfilled, (state, action) => {
				state.isLogged = action.payload.isLogged
			})
	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const auththunks = { authSetLoggedTC }

//========================================================================================

// export const authSetLoggedTC = (email: string, password: string, rememberMe: boolean,
// 								captcha: boolean) => async (dispatch: AppDispatchType) => {
// 	dispatch(appActions.setStatus({ status: true }))
// 	try {
// 		const res = await authAPI.login(email, password, rememberMe, captcha)
// 		if (res.data.resultCode === ResultCode.success) {
// 			dispatch(authActions.setIsLogged({ isLogged: true }))
// 		} else {
// 			handleServerAppError(res.data.messages, dispatch)
// 		}
// 		dispatch(appActions.setStatus({ status: false }))
// 	} catch (error) {
// 		handleServerNetworkError(error, dispatch)
// 	}
// }

// export const authIsInitializedTC = () => async (dispatch: AppDispatchType) => {
// 	try {
// 		const res = await authAPI.me()
// 		if (res.data.resultCode === ResultCode.success) {
// 			dispatch(authActions.setIsLogged({ isLogged: true }))
// 		}
// 	} catch (error) {
// 		if (typeof error === 'string') {
// 			console.error(error)
// 		} else if (error instanceof Error) {
// 			console.error(error.message)
// 		}
// 	}
// 	dispatch(appActions.setAppIsInitialized({ isAppInitialized: true }))
// }

export const authLogoutTC = () => async (dispatch: AppDispatchType) => {

	dispatch(appActions.setStatus({ status: true }))
	try {
		const res = await authAPI.logout()
		if (res.data.resultCode === ResultCode.success) {
			dispatch(authActions.setIsLogged({ isLogged: false }))
			dispatch(todolistsActions.setTodolists({ todolistsFromAPI: [] }))
		} else {
			handleServerAppError(res.data.messages, dispatch)
		}
	} catch (error) {
		handleServerNetworkError(error, dispatch)
	}
	dispatch(appActions.setStatus({ status: false }))
}



