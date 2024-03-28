import {
    appSetStatusAC,
    appReducer,
    InitialStateType,
    AppReducerStatusType,
    AppReducerErrorType,
    appSetErrorAC, appSetIsInitialized
} from '../../state'

//========================================================================================

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'loading',
        error: null,
        isInitialized: false
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

test('APP-SET-IS-INITIALIZED', () => {

    const isInitializedResponse: boolean = true

    const endState = appReducer(startState, appSetIsInitialized(isInitializedResponse))

    expect(endState.isInitialized).toBe(isInitializedResponse)
})