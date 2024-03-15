import {v1} from 'uuid'
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todolistId1,
    todolistId2
} from '../todolists-reducer/todolists-reducer'
import {TaskApiType, TaskPrioritiesEnum, TaskStatusesEnum} from '../../api/tasks-api'

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

//========================================================================================

const initialState: TasksReducerType = {
    [todolistId1]:
        [
            {
                todoListId: todolistId1,
                id: v1(),
                title: 'React',
                status: TaskStatusesEnum.Completed,
                priority: TaskPrioritiesEnum.Low,
                description: '',
                order: 0,
                completed: false,
                addedDate: '',
                startDate: '',
                deadline: ''
            },
            {
                todoListId: todolistId1,
                id: v1(),
                title: 'Redux',
                status: TaskStatusesEnum.New,
                priority: TaskPrioritiesEnum.Low,
                description: '',
                order: 0,
                completed: false,
                addedDate: '',
                startDate: '',
                deadline: ''
            }

        ],
    [todolistId2]:
        [
            {
                todoListId: todolistId2,
                id: v1(), title: 'Book',
                status: TaskStatusesEnum.New,
                priority: TaskPrioritiesEnum.Low,
                description: '',
                order: 0,
                completed: false,
                addedDate: '',
                startDate: '',
                deadline: ''
            },
            {
                todoListId: todolistId2,
                id: v1(), title: 'Milk',
                status: TaskStatusesEnum.Completed,
                priority: TaskPrioritiesEnum.Low,
                description: '',
                order: 0,
                completed: false,
                addedDate: '',
                startDate: '',
                deadline: ''
            }
        ]
}

export const tasksReducer = (state: TasksReducerType = initialState, {
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

        default:
            return state
    }
}