import { AppRootStateType } from 'app/store'

//========================================================================================

export const appStatusSelector = (state: AppRootStateType): boolean => state.appReducer.status