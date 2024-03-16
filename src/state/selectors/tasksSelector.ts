import {AppRootStateType} from '../store'
import {TasksReducerType} from '../reducers/tasks-reducer'

//========================================================================================

export const tasksSelector = (state: AppRootStateType): TasksReducerType => state.tasks