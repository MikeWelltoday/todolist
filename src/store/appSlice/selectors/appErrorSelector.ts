import { AppRootStateType } from 'store/store'
import { AppErrorType } from 'store/appSlice/appSlice'

export const appErrorSelector = (state: AppRootStateType): AppErrorType => state.appSlice.error