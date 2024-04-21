import { TodolistUiType } from 'features/todolist/model/todolistsSlice'
import { AppRootStateType } from 'state/store/store'


export const todolistsSelector = (state: AppRootStateType): TodolistUiType[] => state.todolistsSlice