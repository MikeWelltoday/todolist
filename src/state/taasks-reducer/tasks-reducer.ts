import {tasksObjType} from '../../App'
import {v1} from 'uuid'
import {AddTodolistActionType, RemoveTodolistActionType} from '../todolists-reducer/todolists-reducer'

//========================================================================================
//TYPES

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    id: string
    title: string
}

export type ChangeTaskTypeActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
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
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }

        case 'ADD-TASK' : {
            return {
                ...state,
                [action.id]: [{id: v1(), title: action.title, isDone: false}, ...state[action.id]]
            }
        }

        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }

        case 'CHANGE-TASK-TITLE' : {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }

        case 'ADD-TODOLIST':
            return {...state, [action.id]: []}

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return {...stateCopy}
        }

        default:
            return state
    }
}

//========================================================================================
// ACTION-CREATER

export function removeTaskAC(todolistId: string, taskId: string): RemoveTaskActionType {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export function addTaskAC(todolistId: string, title: string): AddTaskActionType {
    return {type: 'ADD-TASK', id: todolistId, title}
}

export function changeTaskStatusAC(todolistId: string, taskId: string, isDone: boolean): ChangeTaskTypeActionType {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone}
}

export function changeTaskTitleAC(todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}

//========================================================================================