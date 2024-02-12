import {FilterValuesType, TodolistType} from '../App'
import {v1} from 'uuid'

//========================================================================================
//TYPES

type OldActionType = {
    type: string
    [key: string]: any
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

//========================================================================================
// TYPES ALL TOGETHER

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

//========================================================================================
// REDUCER

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return [...state.filter(t => t.id !== action.id)]
        }

        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        }


        default:
            throw new Error('### NOT CORRECT ACTION TYPE ###')
    }
}

//========================================================================================
// ACTION CREATER - контролирует правильность введенных данных для action

export function RemoveTodolistAC(todolistId: string): RemoveTodolistActionType {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export function AddTodolistAC(title: string): AddTodolistActionType {
    return {type: 'ADD-TODOLIST', title}
}

export function ChangeTodolistTitleAC(id: string, title: string): ChangeTodolistTitleActionType {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export function ChangeTodolistFilterAC(id: string, filter: FilterValuesType): ChangeTodolistFilterActionType {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

//========================================================================================