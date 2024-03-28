import {AppRootStateType} from '../store'


export const isInitializedSelector = (state: AppRootStateType): boolean => state.app.isInitialized