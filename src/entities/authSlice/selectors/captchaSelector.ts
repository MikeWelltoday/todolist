import { AppRootStateType } from '../../../state/store/store'


export const captchaSelector = (state: AppRootStateType): string | null => state.authSlice.captchaUrl