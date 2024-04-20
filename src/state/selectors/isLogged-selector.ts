import { AppRootStateType } from 'store/store'

//========================================================================================

export const isLoggedSelector = (state: AppRootStateType): boolean => state.authReducer.isLogged