import { AppRootStateType } from 'store/store'

//========================================================================================

export const isAppInitializedSelector = (state: AppRootStateType): boolean => state.appReducer.isAppInitialized