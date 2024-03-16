import {todolistReducerType} from '../reducers/todolists-reducer'
import {AppRootStateType} from '../store'

//========================================================================================

export const todolistsSelector = (state: AppRootStateType): todolistReducerType[] => state.todolists