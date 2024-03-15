import axios from 'axios'

//========================================================================================

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type FieldErrorType = {
    error: string
    field: string
}

type TodolistsMethodsResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}

//========================================================================================

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '833317a0-7a1b-4997-ba09-b643d5fe2749'
    }
})

//========================================================================================

export const todolistAPI = {

    getTodolist() {
        return instance.get<TodolistsMethodsResponseType<{ item: TodolistType }>>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<TodolistsMethodsResponseType>('todo-lists', {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistsMethodsResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<TodolistsMethodsResponseType>(`todo-lists/${todolistId}`, {title})
    }
}