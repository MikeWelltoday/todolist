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


//========================================================================================

export const authAPI = {




    return instance.post<>('', {email, password, rememberMe, captcha})
}