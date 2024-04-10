import { AppRootStateType } from 'app/store'

//========================================================================================

export const isLoggedSelector = (state: AppRootStateType): boolean => state.authReducer.isLogged