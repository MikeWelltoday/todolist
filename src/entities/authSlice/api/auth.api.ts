import { instance } from 'shared'

//========================================================================================

// for API requests
type LoginResponse = { userId: number }

export type MeResponse = {
	id: number
	email: string
	login: string
}

export type AuthResponse<D = {}> = {
	resultCode: number
	messages: string[]
	data: D
}

export type AuthLoginResponse = AuthResponse<LoginResponse> & {
	fieldsErrors: { error: string, field: string }[]
}

//========================================================================================

export const authApi = {

	login(email: string, password: string, rememberMe: boolean, captcha: string) {
		return instance.post<AuthLoginResponse>('auth/login', {
			email,
			password,
			rememberMe,
			// если указали каптчу, то отправим ее, или просто true если в captcha пришла пустая строка
			captcha: captcha || true
		})
	},

	me() {
		return instance.get<AuthResponse<MeResponse>>('auth/me')
	},

	logout() {
		return instance.delete<AuthResponse>('auth/login')
	}
}
