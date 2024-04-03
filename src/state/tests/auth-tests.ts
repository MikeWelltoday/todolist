import { authReducer, AuthReducerType } from '../index'
import { authActions } from 'state/reducers/auth-reducer'

//========================================================================================

let startState: AuthReducerType

beforeEach(() => {
	startState = {
		isLogged: false
	}
})

test('setIsLogged', () => {
	const endState = authReducer(startState, authActions.setIsLogged({ isLogged: true }))
	expect(endState.isLogged).toBe(false)
})


















