import { TodolistReducerType } from '../reducers/todolists-reducer'
import { AppRootStateType } from 'app/store'

//========================================================================================

export const todolistsSelector = (state: AppRootStateType): TodolistReducerType[] => state.todolists