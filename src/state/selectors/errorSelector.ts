import {AppRootStateType} from '../store'
import {appReducerErrorType} from '../reducers/app-reducer'

//========================================================================================

export const errorSelector = (state: AppRootStateType): appReducerErrorType => state.app.error