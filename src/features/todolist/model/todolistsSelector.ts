import { TodolistReducerType } from 'features/todolist/model/todolistsSlice'
import { AppRootStateType } from 'store/store'


export const todolistsSelector = (state: AppRootStateType): TodolistReducerType[] => state.todolistsSlice