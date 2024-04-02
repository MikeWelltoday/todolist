import { AppRootStateType } from 'app/store'
import { AppReducerErrorType } from '../reducers/app-reducer'

//========================================================================================

export const errorSelector = (state: AppRootStateType): AppReducerErrorType => state.app.error