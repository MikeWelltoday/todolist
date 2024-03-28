import {authReducer, AuthReducerType, authSetLoggedAC} from '../index'

//========================================================================================

let startState: AuthReducerType

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('AUTH-LOGIN', () => {

    const newLoggedMode = true

    const endState = authReducer(startState, authSetLoggedAC(newLoggedMode))
    expect(endState.isLoggedIn).toBe(newLoggedMode)
})


















