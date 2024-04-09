import { AppRootStateType } from 'state/store'

//========================================================================================

export const isLoggedSelector = (state: AppRootStateType): boolean => state.authReducer.isLogged