import {FilterValuesType, TodolistType} from '../../AppWithRedux'
import {v1} from 'uuid'

//========================================================================================

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

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

//========================================================================================

export function removeTodolistAC(todolistId: string): RemoveTodolistActionType {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export function addTodolistAC(title: string): AddTodolistActionType {
    return {type: 'ADD-TODOLIST', payload: {title, id: v1()}} as const
}

export function changeTodolistTitleAC(todolistId: string, title: string): ChangeTodolistTitleActionType {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id: todolistId, title}} as const
}

export function changeTodolistFilterAC(todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id: todolistId, filter}} as const
}

//========================================================================================

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: TodolistType[] =
    [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

export const todolistsReducer = (state: TodolistType[] = initialState, {
    type,
    payload
}: ActionsType): TodolistType[] => {

    switch (type) {

        case 'REMOVE-TODOLIST': {
            return [...state.filter(t => t.id !== payload.id)]
        }

        case 'ADD-TODOLIST': {
            return [{id: payload.id, title: payload.title, filter: 'all'}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === payload.id ? {...t, title: payload.title} : t)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === payload.id ? {...t, filter: payload.filter} : t)
        }

        default: {
            return state
        }
    }
}

//========================================================================================