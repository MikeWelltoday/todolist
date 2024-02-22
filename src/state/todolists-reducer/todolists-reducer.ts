import {FilterValuesType, TodolistType} from '../../AppWithRedux'
import {v1} from 'uuid'

//========================================================================================
// 🎲 .T.Y.P.E.S. - .A.C.

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
// 🎲 .T.Y.P.E.S. - .A.C.T.I.O.N.

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

//========================================================================================
// 🍌 .A.C.

export function removeTodolistAC(todolistId: string): RemoveTodolistActionType {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export function addTodolistAC(title: string): AddTodolistActionType {
    return {type: 'ADD-TODOLIST', payload: {title, id: v1()}} as const
}

export function changeTodolistTitleAC(id: string, title: string): ChangeTodolistTitleActionType {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}} as const
}

export function changeTodolistFilterAC(id: string, filter: FilterValuesType): ChangeTodolistFilterActionType {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const
}

//========================================================================================
// 🧰 .R.E.D.U.C.E.R.

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