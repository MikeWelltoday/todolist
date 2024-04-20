import { AppRootStateType } from 'store/store'
import { StatusType } from 'store/appSlice/appSlice'


export const appStatusSelector = (state: AppRootStateType): StatusType => state.appSlice.status