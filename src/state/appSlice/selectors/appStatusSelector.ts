import { AppRootStateType } from 'state/store/store'
import { StatusType } from 'state/appSlice/appSlice'


export const appStatusSelector = (state: AppRootStateType): StatusType => state.appSlice.status