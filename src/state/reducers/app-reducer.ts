//========================================================================================

export type appReducerStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type appReducerErrorType = string | null

export type InitialStateType = {
    status: appReducerStatusType,
    error: appReducerErrorType
}

//========================================================================================

type appSetStatusActionType = ReturnType<typeof appSetStatusAC>
type appSetErrorActionType = ReturnType<typeof appSetErrorAC>

//========================================================================================

type ActionType = appSetStatusActionType | appSetErrorActionType

//========================================================================================
const initialState: InitialStateType = {
    status: 'idle' as appReducerStatusType,
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

export function appSetStatusAC(status: appReducerStatusType) {
    return {type: 'APP-SET-STATUS', payload: {status}} as const
}

export function appSetErrorAC(error: appReducerErrorType) {
    return {type: 'APP-SET-ERROR', payload: {error}} as const
}



