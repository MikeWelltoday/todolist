import {
	AddTodolistActionType,
	changeTodolistEntityStatusAC,
	RemoveTodolistActionType, RequestStatusType,
	SetTodolistsActionType
} from './todolists-reducer'
import { AppRootStateType, AppThunkDispatchType } from 'app/store'
import { ApiUpdateTaskModelType, TaskApiType, TaskPrioritiesEnum, tasksAPI, TaskStatusesEnum } from '../../api'
import { appSetErrorAC, appSetStatusAC } from './app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils'

//========================================================================================

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleActionType = ReturnType<typeof updateTaskAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>
type ChangeTasksEntityStatusActionType = ReturnType<typeof changeTasksEntityStatusAC>

//========================================================================================

export type TasksActionsType =
	SetTasksActionType
	| AddTaskActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| RemoveTaskActionType
	| ChangeTasksEntityStatusActionType

//========================================================================================

export type UiUpdateTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatusesEnum
	priority?: TaskPrioritiesEnum
	startDate?: string
	deadline?: string
}

export type TaskReducerType = TaskApiType & {
	entityStatus: RequestStatusType
}

export type TasksReducerType = {
	[key: string]: TaskReducerType[]
}

//========================================================================================

const tasksInitialState: TasksReducerType = {}

export const tasksReducer = (state: TasksReducerType = tasksInitialState, {
	type,
	payload
}: TasksActionsType): TasksReducerType => {

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
				[payload.newTaskFromAPI.todoListId]: [{
					...payload.newTaskFromAPI,
					entityStatus: 'succeeded'
				}, ...state[payload.newTaskFromAPI.todoListId]]
			}
		}

		case 'UPDATE-TASK' : {
			return {
				...state,
				[payload.todolistId]: state[payload.todolistId]
					.map(t => t.id === payload.taskId ? { ...t, ...payload.taskUpdateModel } : t)
			}
		}

		case 'ADD-TODOLIST':
			return { ...state, [payload.newTodolistFromAPI.id]: [] }

		case 'REMOVE-TODOLIST': {
			const stateCopy = { ...state }
			delete stateCopy[payload.id]
			return { ...stateCopy }
		}

		case 'SET-TODOLISTS': {
			const stateCopy: TasksReducerType = {}
			payload.todolistsFromAPI.forEach(t => {
				stateCopy[t.id] = []
			})
			return stateCopy
		}

		case 'SET-TASKS': {
			return {
				...state, [payload.todolistId]: payload.tasksFromAPI.map(t => ({ ...t, entityStatus: 'succeeded' }))
			}
		}

		case 'CHANGE-TASKS-ENTITY-STATUS': {
			return {
				...state,
				[payload.todolistId]: state[payload.todolistId].map(t => t.id === payload.taskId ? {
					...t,
					entityStatus: payload.newStatus
				} : t)
			}
		}

		default:
			return state
	}
}

//========================================================================================

export function setTasksAC(todolistId: string, tasksFromAPI: TaskApiType[]) {
	return { type: 'SET-TASKS', payload: { todolistId, tasksFromAPI } } as const
}

export function removeTaskAC(todolistId: string, taskId: string) {
	return { type: 'REMOVE-TASK', payload: { todolistId, taskId } } as const
}

export function addTaskAC(newTaskFromAPI: TaskApiType) {
	return { type: 'ADD-TASK', payload: { newTaskFromAPI } } as const
}

export function updateTaskAC(todolistId: string, taskId: string, taskUpdateModel: UiUpdateTaskModelType) {
	return { type: 'UPDATE-TASK', payload: { todolistId, taskId, taskUpdateModel } } as const
}

export function changeTasksEntityStatusAC(todolistId: string, taskId: string, newStatus: RequestStatusType) {
	return { type: 'CHANGE-TASKS-ENTITY-STATUS', payload: { todolistId, taskId, newStatus } } as const
}

//========================================================================================

export function fetchTasksTC(todolistId: string) {
	return async (dispatch: AppThunkDispatchType) => {
		dispatch(appSetStatusAC('loading'))
		try {
			const res = await tasksAPI.getTasks(todolistId)
			if (!res.data.error) {
				dispatch(setTasksAC(todolistId, res.data.items))
				dispatch(appSetStatusAC('succeeded'))
			} else {
				if (res.data.error) {
					dispatch(appSetErrorAC(res.data.error))
				} else {
					dispatch(appSetErrorAC('Some error occurred'))
				}
				dispatch(appSetStatusAC('failed'))
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
	}
}

export function removeTaskTC(todolistId: string, taskId: string) {
	return async (dispatch: AppThunkDispatchType) => {
		dispatch(appSetStatusAC('loading'))
		dispatch(changeTasksEntityStatusAC(todolistId, taskId, 'loading'))
		try {
			const res = await tasksAPI.deleteTask(todolistId, taskId)
			if (res.data.resultCode === 0) {
				dispatch(removeTaskAC(todolistId, taskId))
				dispatch(appSetStatusAC('succeeded'))
			} else {
				handleServerAppError(res.data.messages, dispatch)
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
	}
}

export function addTaskTC(todolistId: string, newTitle: string) {
	return async (dispatch: AppThunkDispatchType) => {
		dispatch(appSetStatusAC('loading'))
		dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
		try {
			const res = await tasksAPI.createTask(todolistId, newTitle)
			if (res.data.resultCode === 0) {
				dispatch(addTaskAC(res.data.data.item))
				dispatch(appSetStatusAC('succeeded'))
			} else {
				handleServerAppError(res.data.messages, dispatch)
			}
			dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
	}
}

export function updateTaskTC(todolistId: string, taskId: string, taskUpdateModel: UiUpdateTaskModelType) {
	return async (dispatch: AppThunkDispatchType, getState: () => AppRootStateType) => {
		dispatch(appSetStatusAC('loading'))
		dispatch(changeTasksEntityStatusAC(todolistId, taskId, 'loading'))
		const taskToUpdate = getState().tasks[todolistId].filter(t => t.id === taskId)[0]
		const model: ApiUpdateTaskModelType = {
			title: taskToUpdate.title,
			description: taskToUpdate.description,
			status: taskToUpdate.status,
			priority: taskToUpdate.priority,
			startDate: taskToUpdate.startDate,
			deadline: taskToUpdate.deadline,
			...taskUpdateModel
		}

		try {
			const res = await tasksAPI.updateTask(todolistId, taskId, model)
			if (res.data.resultCode === 0) {
				dispatch(updateTaskAC(todolistId, taskId, model))
				dispatch(appSetStatusAC('succeeded'))
				dispatch(changeTasksEntityStatusAC(todolistId, taskId, 'succeeded'))
			} else {
				handleServerAppError(res.data.messages, dispatch)
				dispatch(changeTasksEntityStatusAC(todolistId, taskId, 'failed'))
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
	}
}


