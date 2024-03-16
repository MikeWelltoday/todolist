//========================================================================================

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = typeof initialState

//========================================================================================

type AppChangeStatusActionType = ReturnType<typeof appChangeStatusAC>

//========================================================================================

type ActionType = AppChangeStatusActionType

//========================================================================================

export function appChangeStatusAC(status: RequestStatusType) {
    return {type: 'APP-CHANGE-STATUS', payload: {status}} as const
}

//========================================================================================
const initialState = {
    status: 'loading' as RequestStatusType
}

export function appReducer(state: InitialStateType = initialState, {type, payload}: ActionType): InitialStateType {

    switch (type) {

        case'APP-CHANGE-STATUS': {
            return {...state, status: payload.status}
        }

        default: {
            return state
        }
    }
}



