import {Dispatch} from 'redux'
import {appSetErrorAC, AppSetErrorActionType, appSetStatusAC, AppSetStatusActionType} from '../state'

//========================================================================================

type ErrorUtilsDispatchType = Dispatch<AppSetStatusActionType | AppSetErrorActionType>

export const handleServerAppError =
    (
        resMessagesArr: string[],
        dispatch: ErrorUtilsDispatchType
    ) => {
        dispatch(appSetErrorAC(resMessagesArr.length ? resMessagesArr[0] : 'Some error occurred'))
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



