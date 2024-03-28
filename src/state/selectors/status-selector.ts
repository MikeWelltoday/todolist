import {AppRootStateType} from '../store'
import {AppReducerStatusType} from '../reducers/app-reducer'

//========================================================================================

export const statusSelector = (state: AppRootStateType): AppReducerStatusType => state.app.status