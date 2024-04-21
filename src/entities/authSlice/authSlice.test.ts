import { authSlice, AuthSliceType, authActions } from 'entities/authSlice/authSlice'

let startState: AuthSliceType

beforeEach(() => {
	startState = {
		isLogged: false
	}
})

test('setIsLogged with authSetLoggedTC', () => {
	const action = authActions.loginThunk.fulfilled(
		undefined,
		'',
		{ email: '', password: '', rememberMe: true, captcha: true }
	)
	const endState = authSlice(startState, action)
	expect(endState.isLogged).toBe(true)
})

test('setIsLogged with authIsInitializedTC', () => {
	const action = authActions.initializationThunk.fulfilled(
		undefined,
		'',
		undefined
	)
	const endState = authSlice(startState, action)
	expect(endState.isLogged).toBe(true)
})

test('setIsLogged with authLogoutTC', () => {
	startState = {
		isLogged: true
	}
	const action = authActions.logoutThunk.fulfilled(
		undefined,
		'',
		undefined
	)
	const endState = authSlice(startState, action)
	expect(endState.isLogged).toBe(false)
})


















