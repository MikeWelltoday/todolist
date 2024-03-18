import {
    AddTodolistActionType, changeTodolistEntityStatusAC,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../store'
import {ApiUpdateTaskModelType, TaskApiType, TaskPrioritiesEnum, tasksAPI, TaskStatusesEnum} from '../../api'
import {appSetErrorAC, appSetStatusAC} from './app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils'

//========================================================================================

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleActionType = ReturnType<typeof updateTaskAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>

//========================================================================================

type TasksActionsType =
    SetTasksActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | RemoveTaskActionType

//========================================================================================

export type UiUpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatusesEnum
    priority?: TaskPrioritiesEnum
    startDate?: string
    deadline?: string
}

export type TasksReducerType = {
    [key: string]: TaskApiType[]
}

//========================================================================================

const tasksInitialState: TasksReducerType = {}

export const tasksReducer = (state: TasksReducerType = tasksInitialState, {
    type,
    payload
}: TasksActionsType): TasksReducerType => {

    switch (type) {

        case 'REMOVE-TASK': {
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].filter(t => t.id !== payload.taskId)
            }
        }

        case 'ADD-TASK' : {
            return {
                ...state,
                [payload.newTaskFromAPI.todoListId]: [{...payload.newTaskFromAPI}, ...state[payload.newTaskFromAPI.todoListId]]
            }
        }

        case 'UPDATE-TASK' : {
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId]
                    .map(t => t.id === payload.taskId ? {...t, ...payload.taskUpdateModel} : t)
            }
        }

        case 'ADD-TODOLIST':
            return {...state, [payload.newTodolistFromAPI.id]: []}

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[payload.id]
            return {...stateCopy}
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            payload.todolistsFromAPI.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        }

        case 'SET-TASKS': {
            return {...state, [payload.todolistId]: payload.tasksFromAPI}
        }

        default:
            return state
    }
}

//========================================================================================

export function setTasksAC(todolistId: string, tasksFromAPI: TaskApiType[]) {
    return {type: 'SET-TASKS', payload: {todolistId, tasksFromAPI}} as const
}

export function removeTaskAC(todolistId: string, taskId: string) {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}

export function addTaskAC(newTaskFromAPI: TaskApiType) {
    return {type: 'ADD-TASK', payload: {newTaskFromAPI}} as const
}

export function updateTaskAC(todolistId: string, taskId: string, taskUpdateModel: UiUpdateTaskModelType) {
    return {type: 'UPDATE-TASK', payload: {todolistId, taskId, taskUpdateModel}} as const
}

//========================================================================================

export function fetchTasksTC(todolistId: string) {
    return (dispatch: Dispatch) => {
        dispatch(appSetStatusAC('loading'))
        tasksAPI
            .getTasks(todolistId)
            .then(res => {
                if (!res.data.error) {
                    dispatch(setTasksAC(todolistId, res.data.items))
                    dispatch(appSetStatusAC('succeeded'))
                } else {
                    if (res.data.error) {
                        dispatch(appSetErrorAC(res.data.error))
                    } else {
                        dispatch(appSetErrorAC('Some error occurred'))
                    }
                    dispatch(appSetStatusAC('failed'))
                }
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }
}

export function removeTaskTC(todolistId: string, taskId: string) {
    return (dispatch: Dispatch) => {
        dispatch(appSetStatusAC('loading'))
        tasksAPI
            .deleteTask(todolistId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(todolistId, taskId))
                    dispatch(appSetStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data.messages, dispatch)
                }
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }
}

export function addTaskTC(todolistId: string, newTitle: string) {
    return (dispatch: Dispatch) => {
        dispatch(appSetStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        tasksAPI
            .createTask(todolistId, newTitle)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(appSetStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data.messages, dispatch)
                }
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }
}

export function updateTaskTC(todolistId: string, taskId: string, taskUpdateModel: UiUpdateTaskModelType) {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(appSetStatusAC('loading'))
        const taskToUpdate = getState().tasks[todolistId].filter(t => t.id === taskId)[0]
        const model: ApiUpdateTaskModelType = {
            title: taskToUpdate.title,
            description: taskToUpdate.description,
            status: taskToUpdate.status,
            priority: taskToUpdate.priority,
            startDate: taskToUpdate.startDate,
            deadline: taskToUpdate.deadline,
            ...taskUpdateModel
        }
        tasksAPI
            .updateTask(todolistId, taskId, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, model))
                    dispatch(appSetStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data.messages, dispatch)
                }
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }
}

