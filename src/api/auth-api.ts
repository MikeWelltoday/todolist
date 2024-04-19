import { instance } from '../shared'

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

export type AuthLoginResponseType = AuthResponseType<LoginResponseType> & {
	fieldsErrors: { error: string, field: string }[]
}


export const authAPI = {

	login(email: string, password: string, rememberMe: boolean, captcha: boolean) {
		return instance.post<AuthLoginResponseType>('auth/login', {
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
