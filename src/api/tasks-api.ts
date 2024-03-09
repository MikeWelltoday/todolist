import axios from 'axios'

//========================================================================================

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

type TaskMethodsResponseType<D = { item: TaskType[] }> = {
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
        return instance.get<GetTasksResponseType>(`${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<TaskMethodsResponseType>(`${todolistId}/tasks`, {title})
    },

    deleteTask(todolistId: string, tasksId: string) {
        return instance.delete<TaskMethodsResponseType<{}>>(`${todolistId}/tasks/${tasksId}`)
    },

    updateTaskTitle(todolistId: string, tasksId: string, title: string) {
        return instance.put<TaskMethodsResponseType>(`${todolistId}/tasks/${tasksId}`, {title})
    }

}


















