import { AppRootStateType } from 'store/store'
import { AppErrorType } from 'state/reducers/app-reducer'

export const appErrorSelector = (state: AppRootStateType): AppErrorType => state.appReducer.error