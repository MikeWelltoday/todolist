import { AppRootStateType } from 'state/store'

//========================================================================================

export const appStatusSelector = (state: AppRootStateType): boolean => state.appReducer.status