//========================================================================================

import {AppThunkDispatchType} from '../store'
import {appSetStatusAC} from './app-reducer'
import {authAPI} from '../../api'
import {handleServerAppError, handleServerNetworkError} from '../../utils'

export type AuthActionsType = ReturnType<typeof authSetLoggedAC>

//========================================================================================

export type AuthReducerType = {
    isLoggedIn: boolean
}

//========================================================================================

const initialState = {
    isLoggedIn: false
}

export function authReducer(state: AuthReducerType = initialState,
                            action: AuthActionsType): AuthReducerType {
    switch (action.type) {

        case 'AUTH-SET-LOGGED': {
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        }

        default: {
            return state
        }
    }
}

//========================================================================================

export function authSetLoggedAC(isLoggedIn: boolean) {
    return {type: 'AUTH-SET-LOGGED', payload: {isLoggedIn}} as const
}

//========================================================================================

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



