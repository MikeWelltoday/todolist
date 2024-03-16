import {AppRootStateType} from '../store'
import {RequestStatusType} from '../reducers/app-reducer'

//========================================================================================

export const statusSelector = (state: AppRootStateType): RequestStatusType => state.app.status