import {AppRootStateType} from '../store'
import {appReducerStatusType} from '../reducers/app-reducer'

//========================================================================================

export const statusSelector = (state: AppRootStateType): appReducerStatusType => state.app.status