import { AppRootStateType } from 'state/store/store'
import { AppErrorType } from 'state/appSlice/appSlice'

export const appErrorSelector = (state: AppRootStateType): AppErrorType => state.appSlice.error