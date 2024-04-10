import { AppRootStateType } from 'app/store'
import { AppErrorType } from 'state'

//========================================================================================

export const appErrorSelector = (state: AppRootStateType): AppErrorType => state.appReducer.error