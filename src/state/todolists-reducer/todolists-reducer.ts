import {v1} from 'uuid'
import {TodolistApiType} from '../../api/todolist-api'

//========================================================================================

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>

//========================================================================================

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodolistsActionType

//========================================================================================

export type todolistFilterReducerType = 'all' | 'active' | 'completed'

export type todolistReducerType = TodolistApiType & {
    filter: todolistFilterReducerType
}

//========================================================================================

export function removeTodolistAC(todolistId: string) {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export function addTodolistAC(title: string) {
    return {type: 'ADD-TODOLIST', payload: {title, id: v1()}} as const
}

export function changeTodolistTitleAC(todolistId: string, title: string) {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id: todolistId, title}} as const
}

export function changeTodolistFilterAC(todolistId: string, filter: todolistFilterReducerType) {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id: todolistId, filter}} as const
}

export function setTodolistsAC(todolists: todolistReducerType[]) {
    return {type: 'SET-TODOLISTS', payload: {todolists}} as const
}

//=======================================================================================

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: todolistReducerType[] =
    [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

export const todolistsReducer = (state: todolistReducerType[] = initialState, {
    type,
    payload
}: ActionsType): todolistReducerType[] => {

    switch (type) {

        case 'REMOVE-TODOLIST': {
            return [...state.filter(t => t.id !== payload.id)]
        }

        case 'ADD-TODOLIST': {
            return [{id: payload.id, title: payload.title, filter: 'all', addedDate: '', order: 0}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === payload.id ? {...t, title: payload.title} : t)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === payload.id ? {...t, filter: payload.filter} : t)
        }

        case 'SET-TODOLISTS': {
            return payload.todolists.map(t => ({...t, filter: 'all'}))
        }

        default: {
            return state
        }
    }
}

//========================================================================================