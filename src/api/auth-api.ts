import axios from 'axios'

//========================================================================================

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/auth/login',
    withCredentials: true,
    headers: {
        'API-KEY': '833317a0-7a1b-4997-ba09-b643d5fe2749'
    }
})

//========================================================================================

type LoginParamsResponseType = {
    resultCode: number
    messages: string[]
    data: { userId: number }
}

//========================================================================================

export const authAPI = {

    login(email: string, password: string, rememberMe: boolean, captcha: boolean) {
        return instance.post<LoginParamsResponseType>('', {email, password, rememberMe, captcha})
    }

}
