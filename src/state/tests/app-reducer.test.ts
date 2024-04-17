//========================================================================================

import { appActions, appReducer, AppReducerType } from 'state/reducers/app-reducer'

let startState: AppReducerType

beforeEach(() => {
	startState = {
		status: 'idle',
		error: null,
		isAppInitialized: false
	}
})

test('setStatus', () => {
	const endState = appReducer(startState, appActions.setStatus({ status: 'loading' }))
	expect(endState.status).toBe('loading')
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