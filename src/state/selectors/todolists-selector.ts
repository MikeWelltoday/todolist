import { TodolistReducerType } from '../reducers/todolists-reducer'
import { AppRootStateType } from 'state/store'

//========================================================================================

export const todolistsSelector = (state: AppRootStateType): TodolistReducerType[] => state.todolistsReducer