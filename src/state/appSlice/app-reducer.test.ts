//========================================================================================

import { appActions, appSlice, AppReducerType } from 'state/appSlice/appSlice'

let startState: AppReducerType

beforeEach(() => {
	startState = {
		status: 'idle',
		error: null,
		isAppInitialized: false
	}
})

test('setStatus', () => {
	const endState = appSlice(startState, appActions.setStatus({ status: 'loading' }))
	expect(endState.status).toBe('loading')
})

test('setError', () => {
	const endState = appSlice(startState, appActions.setError({ error: 'error is set here' }))
	expect(endState.error).toBe('error is set here')
})

test('setAppIsInitialized', () => {
	const endState = appSlice(startState,
		appActions.setAppIsInitialized({ isAppInitialized: true }))

	expect(endState.isAppInitialized).toBe(true)
})