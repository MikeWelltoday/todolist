import { AppRootStateType } from 'store/store'
import { StatusType } from 'state/reducers/app-reducer'

//========================================================================================

export const appStatusSelector = (state: AppRootStateType): StatusType => state.appReducer.status