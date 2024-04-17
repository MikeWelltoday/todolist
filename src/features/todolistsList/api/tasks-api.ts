import { instance } from 'api/instance'

//========================================================================================

export const enum TaskStatusesEnum {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export const enum TaskPrioritiesEnum {
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

export type TasksAxiosContainerType<D = { item: TaskApiType }> = {
	resultCode: number
	messages: string[]
	data: D
}

export type ApiUpdateTaskModelType = {
	title: string
	description: string
	status: TaskStatusesEnum
	priority: TaskPrioritiesEnum
	startDate: string
	deadline: string
}

//========================================================================================

export const tasksAPI = {

	getTasks(todolistId: string) {
		return instance.get<GetTasksApiResponseType>(`todo-lists/${todolistId}/tasks`)
	},

	createTask(todolistId: string, title: string) {
		return instance.post<TasksAxiosContainerType>(`todo-lists/${todolistId}/tasks`, { title })
	},

	deleteTask(todolistId: string, tasksId: string) {
		return instance.delete<TasksAxiosContainerType<{}>>(`todo-lists/${todolistId}/tasks/${tasksId}`)
	},

	updateTask(todolistId: string, tasksId: string, model: ApiUpdateTaskModelType) {
		return instance.put<TasksAxiosContainerType>(`todo-lists/${todolistId}/tasks/${tasksId}`, model)
	}

}


















