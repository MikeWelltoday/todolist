//========================================================================================

export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

//========================================================================================

type AuthReducerType = {
    isLoggedIn: boolean
}

//========================================================================================

const initialState = {
    isLoggedIn: false
}

export function authReducer(state: AuthReducerType = initialState, action: AuthActionsType): AuthReducerType {
    switch (action.type) {

        case 'AUTH-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        }

        default: {
            return state
        }
    }
}

//========================================================================================

export function setIsLoggedInAC(isLoggedIn: boolean) {
    return {type: 'AUTH-IS-LOGGED-IN', payload: {isLoggedIn}}
}