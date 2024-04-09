import { AppRootStateType } from 'state/store'

//========================================================================================

export const isAppInitializedSelector = (state: AppRootStateType): boolean => state.appReducer.isAppInitialized