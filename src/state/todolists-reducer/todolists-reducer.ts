import {FilterValuesType, TodolistType} from '../../App'
import {v1} from 'uuid'

//========================================================================================
//TYPES

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: { id: string }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: { title: string, id: string }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: { id: string, title: string }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: { id: string, filter: FilterValuesType }
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
            return [...state.filter(t => t.id !== action.payload.id)]
        }

        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.filter} : t)
        }

        default: {
            return state
        }
    }
}

//========================================================================================
// ACTION CREATER - контролирует правильность введенных данных для action

export function removeTodolistAC(todolistId: string): RemoveTodolistActionType {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}}
}

export function addTodolistAC(title: string): AddTodolistActionType {
    return {type: 'ADD-TODOLIST', payload: {title, id: v1()}}
}

export function changeTodolistTitleAC(id: string, title: string): ChangeTodolistTitleActionType {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}}
}

export function changeTodolistFilterAC(id: string, filter: FilterValuesType): ChangeTodolistFilterActionType {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}}
}

//========================================================================================