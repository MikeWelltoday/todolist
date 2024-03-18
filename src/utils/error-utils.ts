import {appSetErrorAC, appSetStatusAC, AppThunkDispatchType} from '../state'

//========================================================================================

export const handleServerAppError = (resMessagesArr: string[], dispatch: AppThunkDispatchType) => {
    dispatch(appSetErrorAC(resMessagesArr.length ? resMessagesArr[0] : 'Some error occurred'))
    dispatch(appSetStatusAC('failed'))
    console.error(resMessagesArr.length ? resMessagesArr[0] : 'Some error occurred')
}

export function handleServerNetworkError(error: any, dispatch: AppThunkDispatchType) {
    if (typeof error === 'string') {
        dispatch(appSetErrorAC(error))
        dispatch(appSetStatusAC('failed'))
        console.error(error)
    } else if (error instanceof Error) {
        dispatch(appSetErrorAC(error.message))
        dispatch(appSetStatusAC('failed'))
        console.error(error.message)
    }
}



