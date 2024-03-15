import {TasksType} from '../../app/AppWithRedux'
import {v1} from 'uuid'
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todolistId1,
    todolistId2
} from '../todolists-reducer/todolists-reducer'

//========================================================================================

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

//========================================================================================

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

//========================================================================================

export function removeTaskAC(todolistId: string, taskId: string) {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}

export function addTaskAC(todolistId: string, title: string) {
    return {type: 'ADD-TASK', payload: {id: todolistId, title}} as const
}

export function changeTaskStatusAC(todolistId: string, taskId: string, isDone: boolean) {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, isDone}} as const
}

export function changeTaskTitleAC(todolistId: string, taskId: string, title: string) {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
}

//========================================================================================

const initialState: TasksType = {
    [todolistId1]:
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'TS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
    [todolistId2]:
        [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true}
        ]
}

export const tasksReducer = (state: TasksType = initialState, {type, payload}: ActionsType): TasksType => {

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
                [payload.id]: [{
                    id: v1(),
                    title: payload.title,
                    isDone: false
                }, ...state[payload.id]]
            }
        }

        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].map(t => t.id === payload.taskId ? {
                    ...t,
                    isDone: payload.isDone
                } : t)
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

        default:
            return state
    }
}

//========================================================================================