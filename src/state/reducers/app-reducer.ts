//========================================================================================

export type AppReducerStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerErrorType = string | null

export type InitialStateType = {
    status: AppReducerStatusType,
    error: AppReducerErrorType
}

//========================================================================================

export type AppSetStatusActionType = ReturnType<typeof appSetStatusAC>
export type AppSetErrorActionType = ReturnType<typeof appSetErrorAC>

//========================================================================================

type ActionType = AppSetStatusActionType | AppSetErrorActionType
export type AppActionsForThunkDispatch = ActionType

//========================================================================================
const initialState: InitialStateType = {
    status: 'idle' as AppReducerStatusType,
    error: null
}

export function appReducer(state: InitialStateType = initialState, {type, payload}: ActionType): InitialStateType {

    switch (type) {

        case'APP-SET-STATUS': {
            return {...state, status: payload.status}
        }

        case'APP-SET-ERROR': {
            return {...state, error: payload.error}
        }

        default: {
            return state
        }
    }
}

//========================================================================================

export function appSetStatusAC(status: AppReducerStatusType) {
    return {type: 'APP-SET-STATUS', payload: {status}} as const
}

export function appSetErrorAC(error: AppReducerErrorType) {
    return {type: 'APP-SET-ERROR', payload: {error}} as const
}



