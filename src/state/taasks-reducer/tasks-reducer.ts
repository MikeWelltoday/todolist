import {TasksType} from '../../AppWithRedux'
import {v1} from 'uuid'
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todolistId1,
    todolistId2
} from '../todolists-reducer/todolists-reducer'

//========================================================================================
// 🎲 .T.Y.P.E.S. - .A.C.

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
// 🎲 .T.Y.P.E.S. - .A.C.T.I.O.N.

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTypeActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

//========================================================================================
// 🍌 .A.C.

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
// 🧰 .R.E.D.U.C.E.R.

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