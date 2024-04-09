import { authReducer, AuthReducerType, auththunks } from '../index'

//========================================================================================

let startState: AuthReducerType

beforeEach(() => {
	startState = {
		isLogged: false
	}
})

test('setIsLogged with authSetLoggedTC', () => {
	const action = auththunks.authSetLoggedTC.fulfilled(
		{ isLogged: true },
		'',
		{ email: '', password: '', rememberMe: true, captcha: true }
	)
	const endState = authReducer(startState, action)
	expect(endState.isLogged).toBe(false)
})


















