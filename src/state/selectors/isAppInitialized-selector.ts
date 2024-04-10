import { AppRootStateType } from 'app/store'

//========================================================================================

export const isAppInitializedSelector = (state: AppRootStateType): boolean => state.appReducer.isAppInitialized