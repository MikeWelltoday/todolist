import {Dispatch} from 'redux'
import {TodolistApiType, todolistsAPI} from '../../api'
import {appSetStatusAC} from './app-reducer'

//========================================================================================

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>


//========================================================================================

type ActionsType =
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

//=======================================================================================

const todolistsInitialState: todolistReducerType[] = []

export const todolistsReducer = (state: todolistReducerType[] = todolistsInitialState, {
    type,
    payload
}: ActionsType): todolistReducerType[] => {

    switch (type) {

        case 'REMOVE-TODOLIST': {
            return [...state.filter(t => t.id !== payload.id)]
        }

        case 'ADD-TODOLIST': {
            return [{...payload.newTodolistFromAPI, filter: 'all'}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === payload.id ? {...t, title: payload.title} : t)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === payload.id ? {...t, filter: payload.filter} : t)
        }

        case 'SET-TODOLISTS': {
            return payload.todolistsFromAPI.map(t => ({...t, filter: 'all'}))
        }

        default: {
            return state
        }
    }
}

//========================================================================================

export function removeTodolistAC(todolistId: string) {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export function addTodolistAC(newTodolistFromAPI: TodolistApiType) {
    return {type: 'ADD-TODOLIST', payload: {newTodolistFromAPI}} as const
}

export function changeTodolistTitleAC(todolistId: string, title: string) {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id: todolistId, title}} as const
}

export function changeTodolistFilterAC(todolistId: string, filter: todolistFilterReducerType) {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id: todolistId, filter}} as const
}

export function setTodolistsAC(todolistsFromAPI: TodolistApiType[]) {
    return {type: 'SET-TODOLISTS', payload: {todolistsFromAPI}} as const
}

//=======================================================================================

export function fetchTodolistsTC() {
    return (dispatch: Dispatch) => {
        dispatch(appSetStatusAC('loading'))
        todolistsAPI.getTodolist().then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(appSetStatusAC('succeeded'))
        })
    }
}

export function addTodolistTC(title: string) {
    return (dispatch: Dispatch) => {
        dispatch(appSetStatusAC('loading'))
        todolistsAPI.createTodolist(title).then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(appSetStatusAC('succeeded'))
        })
    }
}

export function removeTodolistTC(todolistId: string) {
    return (dispatch: Dispatch) => {
        dispatch(appSetStatusAC('loading'))
        todolistsAPI.deleteTodolist(todolistId).then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(appSetStatusAC('succeeded'))
        })
    }
}

export function updateTodolistTitleTC(todolistId: string, newTitle: string) {
    return (dispatch: Dispatch) => {
        dispatch(appSetStatusAC('loading'))
        todolistsAPI.updateTodolist(todolistId, newTitle).then(() => {
            dispatch(changeTodolistTitleAC(todolistId, newTitle))
            dispatch(appSetStatusAC('succeeded'))
        })
    }
}


