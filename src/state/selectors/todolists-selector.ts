import {TodolistReducerType} from '../reducers/todolists-reducer'
import {AppRootStateType} from '../store'

//========================================================================================

export const todolistsSelector = (state: AppRootStateType): TodolistReducerType[] => state.todolists