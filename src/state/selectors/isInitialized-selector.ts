import { AppRootStateType } from 'app/store'


export const isInitializedSelector = (state: AppRootStateType): boolean => state.app.isInitialized