import {tasksObjType} from '../../App'
import {v1} from 'uuid'
import {AddTodolistActionType, RemoveTodolistActionType} from '../todolists-reducer/todolists-reducer'

//========================================================================================
//TYPES

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: { todolistId: string, taskId: string }
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: { id: string, title: string }
}

export type ChangeTaskTypeActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: { todolistId: string, taskId: string, isDone: boolean }
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: { todolistId: string, taskId: string, title: string }
}

//========================================================================================
// TYPES ALL TOGETHER

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTypeActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

//========================================================================================
// REDUCER

export const tasksReducer = (state: tasksObjType, action: ActionsType): tasksObjType => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }

        case 'ADD-TASK' : {
            return {
                ...state,
                [action.payload.id]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.id]]
            }
        }

        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        }

        case 'CHANGE-TASK-TITLE' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        }

        case 'ADD-TODOLIST':
            return {...state, [action.payload.id]: []}

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return {...stateCopy}
        }

        default:
            return state
    }
}

//========================================================================================
// ACTION-CREATER

export function removeTaskAC(todolistId: string, taskId: string): RemoveTaskActionType {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}

export function addTaskAC(todolistId: string, title: string): AddTaskActionType {
    return {type: 'ADD-TASK', payload: {id: todolistId, title}} as const
}

export function changeTaskStatusAC(todolistId: string, taskId: string, isDone: boolean): ChangeTaskTypeActionType {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, isDone}} as const
}

export function changeTaskTitleAC(todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
}

//========================================================================================