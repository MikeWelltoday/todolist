import {Dispatch} from 'redux'
import {PostDeletePutTaskApiResponseType, TodolistsApiResponseType} from '../api'
import {appSetErrorAC, AppSetErrorActionType, appSetStatusAC, AppSetStatusActionType} from '../state'

//========================================================================================

type ErrorUtilsDispatchType = Dispatch<AppSetStatusActionType | AppSetErrorActionType>

export const handleServerAppError =
    <T>(
        data: PostDeletePutTaskApiResponseType<T> | TodolistsApiResponseType<T>,
        dispatch: ErrorUtilsDispatchType
    ) => {
        if (data.messages.length) {
            dispatch(appSetErrorAC(data.messages[0]))
        } else {
            dispatch(appSetErrorAC('Some error occurred'))
        }
        dispatch(appSetStatusAC('failed'))
    }

export const handleServerNetworkError =
    (
        error: { message: string },
        dispatch: ErrorUtilsDispatchType
    ) => {
        dispatch(appSetErrorAC(error.message))
        dispatch(appSetStatusAC('failed'))
        console.error(error.message)
    }



