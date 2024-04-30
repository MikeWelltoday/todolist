import { appActions, AppSlice, appSlice } from 'state/appSlice/appSlice'

let startState: AppSlice

beforeEach(() => {
	startState = {
		status: 'idle',
		error: null,
		isAppInitialized: false
	}
})

test('setStatus', () => {
	const endState = appSlice(startState, appActions.setStatusAction({ status: 'loading' }))
	expect(endState.status).toBe('loading')
})


test('setError', () => {
	const endState = appSlice(startState, appActions.setErrorAction({ error: 'error is set here' }))
	expect(endState.error).toBe('error is set here')
})

test('setAppIsInitialized', () => {
	const endState = appSlice(startState, appActions.setInitializationAction({ isAppInitialized: true }))
	expect(endState.isAppInitialized).toBe(true)
})