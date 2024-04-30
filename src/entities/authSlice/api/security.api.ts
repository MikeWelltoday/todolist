import axios from 'axios'

//========================================================================================

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/security/get-captcha-url',
	withCredentials: true,
	headers: {
		'API-KEY': '833317a0-7a1b-4997-ba09-b643d5fe2749'
	}
})

//========================================================================================

type GetCaptchaResponse = {
	url: string
}

//========================================================================================

export const securityAPI = {

	getCaptcha() {
		return instance.get<GetCaptchaResponse>('')
	}

}


