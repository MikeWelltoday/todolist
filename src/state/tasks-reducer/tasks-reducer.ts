import {v1} from 'uuid'
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsActionType
} from '../todolists-reducer/todolists-reducer'
import {TaskApiType, TaskPrioritiesEnum, tasksAPI, TaskStatusesEnum} from '../../api/tasks-api'
import {Dispatch} from 'redux'

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

export function addTaskAC(todolistId: string, title: string) {
    return {type: 'ADD-TASK', payload: {todolistId, title}} as const
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

export function FetchTasksTC(todolistId: string) {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId).then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
    }
}


//========================================================================================

export const tasksInitialState: TasksReducerType = {}

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
                [payload.todolistId]: [{
                    todoListId: payload.todolistId,
                    id: v1(),
                    title: payload.title,
                    status: TaskStatusesEnum.New,
                    priority: TaskPrioritiesEnum.Low,
                    description: '',
                    order: 0,
                    completed: false,
                    addedDate: '',
                    startDate: '',
                    deadline: ''
                }, ...state[payload.todolistId]]
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
            return {...state, [payload.id]: []}

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
            const stateCopy = {...state}
            stateCopy[payload.todolistId] = payload.tasksFromAPI
            return stateCopy
        }

        default:
            return state
    }
}

