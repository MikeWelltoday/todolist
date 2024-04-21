import { instance, TaskPrioritiesEnum, TaskStatusesEnum } from '../../../shared'


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

export type GetTasksApiResponseType = {
	items: TaskApiType[]
	totalCount: number
	error: string
}

export type TasksAxiosResponseType<D = { item: TaskApiType }> = {
	resultCode: number
	messages: string[]
	data: D
}

export type ApiUpdatedTaskModelType = {
	title: string
	description: string
	status: TaskStatusesEnum
	priority: TaskPrioritiesEnum
	startDate: string
	deadline: string
}


export const tasksAPI = {

	getTasks(todolistId: string) {
		return instance.get<GetTasksApiResponseType>(`todo-lists/${todolistId}/tasks`)
	},

	createTask(todolistId: string, title: string) {
		return instance.post<TasksAxiosResponseType>(`todo-lists/${todolistId}/tasks`, { title })
	},

	deleteTask(todolistId: string, tasksId: string) {
		return instance.delete<TasksAxiosResponseType<{}>>(`todo-lists/${todolistId}/tasks/${tasksId}`)
	},

	updateTask(todolistId: string, tasksId: string, model: ApiUpdatedTaskModelType) {
		return instance.put<TasksAxiosResponseType>(`todo-lists/${todolistId}/tasks/${tasksId}`, model)
	}
}


















