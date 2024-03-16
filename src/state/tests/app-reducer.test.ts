import {appChangeStatusAC, appReducer, InitialStateType, RequestStatusType} from '../reducers/app-reducer'

//========================================================================================

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'loading'
    }
})

test('', () => {

    const newStatus: RequestStatusType = 'succeeded'

    const endState = appReducer(startState, appChangeStatusAC(newStatus))

    expect(endState.status).toBe(newStatus)
})