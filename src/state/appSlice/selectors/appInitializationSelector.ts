import { AppRootStateType } from 'state/store/store'


export const appInitializationSelector = (state: AppRootStateType): boolean => state.appSlice.isAppInitialized