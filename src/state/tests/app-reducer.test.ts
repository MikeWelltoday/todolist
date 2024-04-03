import {
	appReducer, AppReducerType, appActions
} from 'state'

//========================================================================================

let startState: AppReducerType

beforeEach(() => {
	startState = {
		status: true,
		error: null,
		isAppInitialized: false
	}
})

test('setStatus', () => {
	const endState = appReducer(startState, appActions.setStatus({ status: true }))
	expect(endState.status).toBe(true)
})

test('setError', () => {
	const endState = appReducer(startState, appActions.setError({ error: 'error is set here' }))
	expect(endState.error).toBe('error is set here')
})

test('setAppIsInitialized', () => {
	const endState = appReducer(startState,
		appActions.setAppIsInitialized({ isAppInitialized: true }))

	expect(endState.isAppInitialized).toBe(true)
})