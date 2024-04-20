import { AppRootStateType } from 'state/store/store'


export const isLoggedSelector = (state: AppRootStateType): boolean => state.authSlice.isLogged