import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsActionType
} from './todolists-reducer'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../store'
import {TaskApiType, tasksAPI, TaskStatusesEnum} from '../../api'
import {appChangeStatusAC} from './app-reducer'

//========================================================================================

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>

//========================================================================================

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodolistsActionType
    | SetTasksActionType

//========================================================================================

export type TasksReducerType = {
    [key: string]: TaskApiType[]
}

//========================================================================================

export function removeTaskAC(todolistId: string, taskId: string) {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}

export function addTaskAC(newTaskFromAPI: TaskApiType) {
    return {type: 'ADD-TASK', payload: {newTaskFromAPI}} as const
}

export function changeTaskStatusAC(todolistId: string, taskId: string, status: TaskStatusesEnum) {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, status}} as const
}

export function changeTaskTitleAC(todolistId: string, taskId: string, title: string) {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
}

export function setTasksAC(todolistId: string, tasksFromAPI: TaskApiType[]) {
    return {type: 'SET-TASKS', payload: {todolistId, tasksFromAPI}} as const
}

//========================================================================================

export function fetchTasksTC(todolistId: string) {
    return (dispatch: Dispatch) => {
        dispatch(appChangeStatusAC('loading'))
        tasksAPI.getTasks(todolistId).then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(appChangeStatusAC('succeeded'))
        })
    }
}

export function removeTaskTC(todolistId: string, taskId: string) {
    return (dispatch: Dispatch) => {
        dispatch(appChangeStatusAC('loading'))
        tasksAPI.deleteTask(todolistId, taskId).then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(appChangeStatusAC('succeeded'))
        })
    }
}

export function addTaskTC(todolistId: string, newTitle: string) {
    return (dispatch: Dispatch) => {
        dispatch(appChangeStatusAC('loading'))
        tasksAPI.createTask(todolistId, newTitle).then(res => {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(appChangeStatusAC('succeeded'))
        })
    }
}

export function updateTaskStatusTC(todolistId: string, taskId: string, status: TaskStatusesEnum) {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        dispatch(appChangeStatusAC('loading'))

        const taskToUpdate = getState().tasks[todolistId].filter(t => t.id === taskId)[0]
        const model = {
            title: taskToUpdate.title,
            description: taskToUpdate.description,
            status: status,
            priority: taskToUpdate.priority,
            startDate: taskToUpdate.startDate,
            deadline: taskToUpdate.deadline
        }

        tasksAPI.updateTask(todolistId, taskId, model).then(() => {
            dispatch(changeTaskStatusAC(todolistId, taskId, status))
            dispatch(appChangeStatusAC('succeeded'))
        })
    }
}

export function updateTaskTitleTC(todolistId: string, taskId: string, title: string) {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        dispatch(appChangeStatusAC('loading'))

        const taskToUpdate = getState().tasks[todolistId].filter(t => t.id === taskId)[0]
        const model = {
            title,
            description: taskToUpdate.description,
            status: taskToUpdate.status,
            priority: taskToUpdate.priority,
            startDate: taskToUpdate.startDate,
            deadline: taskToUpdate.deadline
        }

        tasksAPI.updateTask(todolistId, taskId, model).then(() => {
            dispatch(changeTaskTitleAC(todolistId, taskId, title))
            dispatch(appChangeStatusAC('succeeded'))
        })
    }
}

//========================================================================================

const tasksInitialState: TasksReducerType = {}

export const tasksReducer = (state: TasksReducerType = tasksInitialState, {
    type,
    payload
}: ActionsType): TasksReducerType => {

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

        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].map(t => t.id === payload.taskId ?
                    {...t, status: payload.status} : t)
            }
        }

        case 'CHANGE-TASK-TITLE' : {
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].map(t => t.id === payload.taskId ? {
                    ...t,
                    title: payload.title
                } : t)
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

