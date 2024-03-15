import axios from 'axios'

//========================================================================================

export enum TaskStatusesEnum {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPrioritiesEnum {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type TaskApiType = {
    todoListId: string
    id: string
    title: string
    status: TaskStatusesEnum
    priority: TaskPrioritiesEnum

    description: string
    order: number
    completed: boolean
    addedDate: string
    startDate: string
    deadline: string
}

type GetTasksApiResponseType = {
    items: TaskApiType[]
    totalCount: number
    error: string
}

type PostDeletePutTaskApiResponseType<D = { item: TaskApiType[] }> = {
    resultCode: number
    messages: string[]
    data: D
}

//========================================================================================

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '833317a0-7a1b-4997-ba09-b643d5fe2749'
    }
})

//========================================================================================

export const tasksAPI = {

    getTasks(todolistId: string) {
        return instance.get<GetTasksApiResponseType>(`${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<PostDeletePutTaskApiResponseType>(`${todolistId}/tasks`, {title})
    },

    deleteTask(todolistId: string, tasksId: string) {
        return instance.delete<PostDeletePutTaskApiResponseType<{}>>(`${todolistId}/tasks/${tasksId}`)
    },

    updateTaskTitle(todolistId: string, tasksId: string, title: string) {
        return instance.put<PostDeletePutTaskApiResponseType>(`${todolistId}/tasks/${tasksId}`, {title})
    }

}


















