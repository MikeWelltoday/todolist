import { authSlice, AuthSliceType, authActions } from 'entities/authSlice/authSlice'

let startState: AuthSliceType

beforeEach(() => {
	startState = {
		isLogged: false,
		captchaUrl: null
	}
})

test('setIsLogged with authSetLoggedTC', () => {
	const startState: AuthSliceType = {
		isLogged: false,
		// также проверим что каптча зануляется при успешнов входе
		// если вход был с каптчей
		captchaUrl: '123'
	}

	const action = authActions.loginThunk.fulfilled(
		undefined,
		'',
		{ email: '', password: '', rememberMe: true, captcha: '' }
	)
	const endState = authSlice(startState, action)
	expect(endState.isLogged).toBe(true)
	expect(endState.captchaUrl).toBe('')
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
	const action = authActions.logoutThunk.fulfilled(
		undefined,
		'',
		undefined
	)
	const endState = authSlice(startState, action)
	expect(endState.isLogged).toBe(false)
})

test('captchaThunk', () => {
	const action = authActions.captchaThunk.fulfilled(
		{ captchaUrl: '123' },
		'',
		undefined
	)
	const endState = authSlice(startState, action)
	expect(endState.captchaUrl).toBe('123')
})


















