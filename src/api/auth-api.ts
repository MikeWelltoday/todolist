import { instance } from 'api/instance'

//========================================================================================

type LoginResponseType = {
	userId: number
}

type MeResponseType = {
	id: number
	email: string
	login: string
}

type AuthResponseType<D = {}> = {
	resultCode: number
	messages: string[]
	data: D
}

//========================================================================================

export const authAPI = {

	login(email: string, password: string, rememberMe: boolean, captcha: boolean) {
		return instance.post<AuthResponseType<LoginResponseType>>('auth/login', {
			email,
			password,
			rememberMe,
			captcha
		})
	},

	me() {
		return instance.get<AuthResponseType<MeResponseType>>('auth/me')
	},

	logout() {
		return instance.delete<AuthResponseType>('auth/login')
	}
}
