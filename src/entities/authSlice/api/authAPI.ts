import { instance } from '../../../shared'

// for API requests
type LoginResponseType = {
	userId: number
}

export type MeResponseType = {
	id: number
	email: string
	login: string
}

export type AuthResponseType<D = {}> = {
	resultCode: number
	messages: string[]
	data: D
}

export type AuthLoginResponseType = AuthResponseType<LoginResponseType> & {
	fieldsErrors: { error: string, field: string }[]
}


export const authAPI = {

	login(email: string, password: string, rememberMe: boolean, captcha: string) {
		return instance.post<AuthLoginResponseType>('auth/login', {
			email,
			password,
			rememberMe,
			// если указали каптчу, то отправим ее, или просто true если в captcha пришла пустая строка
			captcha: captcha || true
		})
	},

	me() {
		return instance.get<AuthResponseType<MeResponseType>>('auth/me')
	},

	logout() {
		return instance.delete<AuthResponseType>('auth/login')
	}
}
