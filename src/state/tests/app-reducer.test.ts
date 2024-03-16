import {
    appSetStatusAC,
    appReducer,
    InitialStateType,
    appReducerStatusType,
    appReducerErrorType,
    appSetErrorAC
} from '../../state'

//========================================================================================

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'loading',
        error: null
    }
})

test('APP-SET-STATUS', () => {

    const newStatus: appReducerStatusType = 'succeeded'

    const endState = appReducer(startState, appSetStatusAC(newStatus))

    expect(endState.status).toBe(newStatus)
})

test('APP-SET-ERROR', () => {

    const newError: appReducerErrorType = 'error'

    const endState = appReducer(startState, appSetErrorAC(newError))

    expect(endState.error).toBe(newError)
})