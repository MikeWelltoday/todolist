import {
    appSetStatusAC,
    appReducer,
    InitialStateType,
    AppReducerStatusType,
    AppReducerErrorType,
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

    const newStatus: AppReducerStatusType = 'succeeded'

    const endState = appReducer(startState, appSetStatusAC(newStatus))

    expect(endState.status).toBe(newStatus)
})

test('APP-SET-ERROR', () => {

    const newError: AppReducerErrorType = 'error is set here'

    const endState = appReducer(startState, appSetErrorAC(newError))

    expect(endState.error).toBe(newError)
})