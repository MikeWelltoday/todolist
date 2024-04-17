import { TodolistReducerType } from 'features/todolistsList/model/todolist/todolists-reducer'
import { AppRootStateType } from 'app/store'

//========================================================================================

export const todolistsSelector = (state: AppRootStateType): TodolistReducerType[] => state.todolistsReducer