//========================================================================================

export type AppReducerStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerErrorType = string | null

export type InitialStateType = {
    status: AppReducerStatusType
    error: AppReducerErrorType
    isInitialized: boolean
}

//========================================================================================

export type AppActionsType =
    ReturnType<typeof appSetStatusAC>
    | ReturnType<typeof appSetErrorAC>
    | ReturnType<typeof appSetIsInitialized>

//========================================================================================
const initialState: InitialStateType = {
    status: 'idle' as AppReducerStatusType,
    error: null,
    isInitialized: false
}

export function appReducer(state: InitialStateType = initialState, {type, payload}: AppActionsType): InitialStateType {

    switch (type) {

        case'APP-SET-STATUS': {
            return {...state, status: payload.status}
        }

        case'APP-SET-ERROR': {
            return {...state, error: payload.error}
        }

        case 'APP-SET-IS-INITIALIZED': {
            return {...state, isInitialized: payload.status}
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

export function appSetIsInitialized(status: boolean) {
    return {type: 'APP-SET-IS-INITIALIZED', payload: {status}} as const
}



