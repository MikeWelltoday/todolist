import axios from 'axios'

//========================================================================================

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/auth/',
	withCredentials: true,
	headers: {
		'API-KEY': '833317a0-7a1b-4997-ba09-b643d5fe2749'
	}
})

// mk.mikhail.k@gmail.com
// cvfgrty342es

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
		return instance.post<AuthResponseType<LoginResponseType>>('login', { email, password, rememberMe, captcha })
	},

	me() {
		return instance.get<AuthResponseType<MeResponseType>>('me')
	},

	logout() {
		return instance.delete<AuthResponseType>('login')
	}
}
