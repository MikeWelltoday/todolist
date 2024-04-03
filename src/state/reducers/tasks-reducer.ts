import { RequestStatusType } from './todolists-reducer'
import { AppDispatchType, AppRootStateType } from 'app/store'
import { ApiUpdateTaskModelType, TaskApiType, TaskPrioritiesEnum, tasksAPI, TaskStatusesEnum } from 'api'
import { handleServerAppError, handleServerNetworkError } from 'utils'
import { appActions } from 'state/reducers/app-reducer'
import { createSlice } from '@reduxjs/toolkit'

//========================================================================================

export type UiUpdateTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatusesEnum
	priority?: TaskPrioritiesEnum
	startDate?: string
	deadline?: string
}

export type TaskType = TaskApiType & {
	entityStatus: RequestStatusType
}

export type TasksReducerType = {
	[key: string]: TaskType[]
}

//========================================================================================


export const tasksReducer = (state: TasksReducerType = initialState, {
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

const initialState: TasksReducerType = {}

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {}
})


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
	return async (dispatch: AppDispatchType) => {
		dispatch(appActions.setStatus({ status: true }))
		try {
			const res = await tasksAPI.getTasks(todolistId)
			if (!res.data.error) {
				dispatch(setTasksAC(todolistId, res.data.items))
			} else {
				if (res.data.error) {
					dispatch(appActions.setError({ error: res.data.error }))
				} else {
					dispatch(appActions.setError({ error: 'to get Tasks is failed' }))
				}
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
		dispatch(appActions.setStatus({ status: false }))
	}
}

export function removeTaskTC(todolistId: string, taskId: string) {
	return async (dispatch: AppDispatchType) => {
		dispatch(appActions.setStatus({ status: true }))
		dispatch(changeTasksEntityStatusAC(todolistId, taskId, 'loading'))
		try {
			const res = await tasksAPI.deleteTask(todolistId, taskId)
			if (res.data.resultCode === 0) {
				dispatch(removeTaskAC(todolistId, taskId))
			} else {
				handleServerAppError(res.data.messages, dispatch)
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
		dispatch(appActions.setStatus({ status: false }))
	}
}

export function addTaskTC(todolistId: string, newTitle: string) {
	return async (dispatch: AppDispatchType) => {
		dispatch(appActions.setStatus({ status: true }))
		dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
		try {
			const res = await tasksAPI.createTask(todolistId, newTitle)
			if (res.data.resultCode === 0) {
				dispatch(addTaskAC(res.data.data.item))
			} else {
				handleServerAppError(res.data.messages, dispatch)
			}
			dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
		dispatch(appActions.setStatus({ status: false }))
	}
}

export function updateTaskTC(todolistId: string, taskId: string, taskUpdateModel: UiUpdateTaskModelType) {
	return async (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
		dispatch(appActions.setStatus({ status: true }))
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
				dispatch(changeTasksEntityStatusAC(todolistId, taskId, 'succeeded'))
			} else {
				handleServerAppError(res.data.messages, dispatch)
				dispatch(changeTasksEntityStatusAC(todolistId, taskId, 'failed'))
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
		dispatch(appActions.setStatus({ status: false }))
	}
}


