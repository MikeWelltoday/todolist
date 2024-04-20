import { AppRootStateType } from 'store/store'


export const appInitializationSelector = (state: AppRootStateType): boolean => state.appSlice.isAppInitialized