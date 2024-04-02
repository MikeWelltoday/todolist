import { AppThunkDispatchType } from 'app/store'
import { appSetIsInitialized, appSetStatusAC } from './app-reducer'
import { authAPI } from 'api'
import { handleServerAppError, handleServerNetworkError } from 'utils'
import { setTodolistsAC } from './todolists-reducer'

export type AuthActionsType = ReturnType<typeof authSetLoggedAC>

//========================================================================================

export type AuthReducerType = {
	isLoggedIn: boolean
}

//========================================================================================

const initialState: AuthReducerType = {
	isLoggedIn: false
}

export function authReducer(state: AuthReducerType = initialState,
														action: AuthActionsType): AuthReducerType {
	switch (action.type) {

		case 'AUTH-LOGIN': {
			return { ...state, isLoggedIn: action.payload.isLoggedIn }
		}

		default: {
			return state
		}
	}
}

//========================================================================================

export function authSetLoggedAC(isLoggedIn: boolean) {
	return { type: 'AUTH-LOGIN', payload: { isLoggedIn } } as const
}

//==================================== ====================================================

export const authSetLoggedTC = (email: string, password: string, rememberMe: boolean,
																captcha: boolean) => async (dispatch: AppThunkDispatchType) => {

	dispatch(appSetStatusAC('loading'))
	try {
		const res = await authAPI.login(email, password, rememberMe, captcha)
		if (res.data.resultCode === 0) {
			dispatch(authSetLoggedAC(true))
			dispatch(appSetStatusAC('succeeded'))
		} else {
			handleServerAppError(res.data.messages, dispatch)
		}
	} catch (error) {
		handleServerNetworkError(error, dispatch)
	}
}

export const authIsInitializedTC = () => async (dispatch: AppThunkDispatchType) => {
	try {
		const res = await authAPI.me()
		if (res.data.resultCode === 0) {
			dispatch(authSetLoggedAC(true))
		}
	} catch (error) {
		// так как будет крутилка isInitialized, не нужно отключать другие крутилки
		if (typeof error === 'string') {
			console.error(error)
		} else if (error instanceof Error) {
			console.error(error.message)
		}
	}

	dispatch(appSetIsInitialized(true))
}

export const authLogoutTC = () => async (dispatch: AppThunkDispatchType) => {
	dispatch(appSetStatusAC('loading'))
	try {
		const res = await authAPI.logout()
		if (res.data.resultCode === 0) {
			dispatch(authSetLoggedAC(false))
			dispatch(setTodolistsAC([]))
			dispatch(appSetStatusAC('succeeded'))
		} else {
			handleServerAppError(res.data.messages, dispatch)
		}

	} catch (error) {
		handleServerNetworkError(error, dispatch)
	}
}



