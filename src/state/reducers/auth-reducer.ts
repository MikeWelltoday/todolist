import { authAPI } from 'api'
import { handleServerAppError, handleServerNetworkError } from 'utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatchType } from 'app/store'
import { appActions } from 'state/reducers/app-reducer'
import { todolistsActions } from 'state/reducers/todolists-reducer'

//========================================================================================

export type AuthReducerType = { isLogged: boolean }

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

	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions

//========================================================================================

export const authSetLoggedTC = (email: string, password: string, rememberMe: boolean,
								captcha: boolean) => async (dispatch: AppDispatchType) => {
	dispatch(appActions.setStatus({ status: true }))
	try {
		const res = await authAPI.login(email, password, rememberMe, captcha)
		if (res.data.resultCode === 0) {
			dispatch(authActions.setIsLogged({ isLogged: true }))
		} else {
			handleServerAppError(res.data.messages, dispatch)
		}
		dispatch(appActions.setStatus({ status: false }))
	} catch (error) {
		handleServerNetworkError(error, dispatch)
	}
}


export const authIsInitializedTC = () => async (dispatch: AppDispatchType) => {
	try {
		const res = await authAPI.me()
		if (res.data.resultCode === 0) {
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

export const authLogoutTC = () => async (dispatch: AppDispatchType) => {

	dispatch(appActions.setStatus({ status: true }))
	try {
		const res = await authAPI.logout()
		if (res.data.resultCode === 0) {
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



