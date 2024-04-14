import { authReducer, AuthReducerType, authThunks } from 'state/reducers/auth-reducer'

//========================================================================================


let startState: AuthReducerType

beforeEach(() => {
	startState = {
		isLogged: false
	}
})

test('setIsLogged with authSetLoggedTC', () => {
	const action = authThunks.authSetLoggedTC.fulfilled(
		undefined,
		'',
		{ email: '', password: '', rememberMe: true, captcha: true }
	)
	const endState = authReducer(startState, action)
	expect(endState.isLogged).toBe(true)
})

test('setIsLogged with authIsInitializedTC', () => {
	const action = authThunks.authIsInitializedTC.fulfilled(
		undefined,
		'',
		undefined
	)
	const endState = authReducer(startState, action)
	expect(endState.isLogged).toBe(true)
})

test('setIsLogged with authLogoutTC', () => {
	startState = {
		isLogged: true
	}
	const action = authThunks.authLogoutTC.fulfilled(
		undefined,
		'',
		undefined
	)
	const endState = authReducer(startState, action)
	expect(endState.isLogged).toBe(false)
})


















