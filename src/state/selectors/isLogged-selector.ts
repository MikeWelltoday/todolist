import {AppRootStateType} from '../store'

//========================================================================================

export const isLoggedSelector = (state: AppRootStateType): boolean => state.auth.isLoggedIn