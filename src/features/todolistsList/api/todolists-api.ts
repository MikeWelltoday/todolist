import { instance } from '../../../shared'

export type TodolistApiType = {
	id: string
	title: string
	addedDate: string
	order: number
}

type FieldErrorType = {
	error: string
	field: string
}

export type TodolistsApiResponseType<D = {}> = {
	resultCode: number
	messages: string[]
	fieldsErrors: FieldErrorType[]
	data: D
}


export const todolistsAPI = {

	getTodolist() {
		return instance.get<TodolistApiType[]>('todo-lists')
	},

	createTodolist(title: string) {
		return instance.post<TodolistsApiResponseType<{ item: TodolistApiType }>>('todo-lists', { title })
	},

	deleteTodolist(todolistId: string) {
		return instance.delete<TodolistsApiResponseType>(`todo-lists/${todolistId}`)
	},

	updateTodolist(todolistId: string, title: string) {
		return instance.put<TodolistsApiResponseType>(`todo-lists/${todolistId}`, { title })
	}
}