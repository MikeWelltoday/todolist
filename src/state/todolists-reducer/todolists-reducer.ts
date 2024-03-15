import {FilterValuesType, TodolistType} from '../../app/AppWithRedux'
import {v1} from 'uuid'

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

export function removeTodolistAC(todolistId: string) {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export function addTodolistAC(title: string) {
    return {type: 'ADD-TODOLIST', payload: {title, id: v1()}} as const
}

export function changeTodolistTitleAC(todolistId: string, title: string) {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id: todolistId, title}} as const
}

export function changeTodolistFilterAC(todolistId: string, filter: FilterValuesType) {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id: todolistId, filter}} as const
}

export function setTodolistsAC(todolists: TodolistType[]) {
    return {type: 'SET-TODOLISTS', payload: {todolists}} as const
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

        case 'SET-TODOLISTS': {
            return payload.todolists.map(t => ({...t, filter: 'all'}))
        }

        default: {
            return state
        }
    }
}

//========================================================================================