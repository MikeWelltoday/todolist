import { TodolistApiType, todolistsAPI } from '../../api'
import { appSetErrorAC, appSetStatusAC } from './app-reducer'
import { AppThunkDispatchType } from 'app/store'
import { handleServerAppError, handleServerNetworkError } from '../../utils'
import { fetchTasksTC } from './tasks-reducer'

//========================================================================================

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
type ChangeTodolistEntityStatusAction = ReturnType<typeof changeTodolistEntityStatusAC>


//========================================================================================

export type TodolistsActionsType =
	RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType
	| SetTodolistsActionType
	| ChangeTodolistEntityStatusAction

//========================================================================================

export type TodolistFilterReducerType = 'all' | 'active' | 'completed'
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TodolistReducerType = TodolistApiType & {
	filter: TodolistFilterReducerType
	entityStatus: RequestStatusType
}

//=======================================================================================

const todolistsInitialState: TodolistReducerType[] = []

export const todolistsReducer = (state: TodolistReducerType[] = todolistsInitialState, {
	type,
	payload
}: TodolistsActionsType): TodolistReducerType[] => {

	switch (type) {

		case 'REMOVE-TODOLIST': {
			return [...state.filter(t => t.id !== payload.id)]
		}

		case 'ADD-TODOLIST': {
			return [{ ...payload.newTodolistFromAPI, filter: 'all', entityStatus: 'succeeded' }, ...state]
		}

		case 'CHANGE-TODOLIST-TITLE': {
			return state.map(t => t.id === payload.id ? { ...t, title: payload.title } : t)
		}

		case 'CHANGE-TODOLIST-FILTER': {
			return state.map(t => t.id === payload.id ? { ...t, filter: payload.filter } : t)
		}

		case 'SET-TODOLISTS': {
			return payload.todolistsFromAPI.map(t => ({ ...t, filter: 'all', entityStatus: 'succeeded' }))
		}

		case 'CHANGE-TODOLIST-ENTITY-STATUS': {
			return state.map(t => t.id === payload.todolistId ? { ...t, entityStatus: payload.newStatus } : t)
		}

		default: {
			return state
		}
	}
}

//========================================================================================

export function removeTodolistAC(todolistId: string) {
	return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}

export function addTodolistAC(newTodolistFromAPI: TodolistApiType) {
	return { type: 'ADD-TODOLIST', payload: { newTodolistFromAPI } } as const
}

export function changeTodolistTitleAC(todolistId: string, title: string) {
	return { type: 'CHANGE-TODOLIST-TITLE', payload: { id: todolistId, title } } as const
}

export function changeTodolistFilterAC(todolistId: string, filter: TodolistFilterReducerType) {
	return { type: 'CHANGE-TODOLIST-FILTER', payload: { id: todolistId, filter } } as const
}

export function setTodolistsAC(todolistsFromAPI: TodolistApiType[]) {
	return { type: 'SET-TODOLISTS', payload: { todolistsFromAPI } } as const
}

export function changeTodolistEntityStatusAC(todolistId: string, newStatus: RequestStatusType) {
	return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload: { todolistId, newStatus } } as const
}

//=======================================================================================

export function fetchTodolistsTC() {
	return async (dispatch: AppThunkDispatchType) => {
		dispatch(appSetStatusAC('loading'))
		try {
			const res = await todolistsAPI.getTodolist()
			if (res.data.length) {
				dispatch(setTodolistsAC(res.data))
				dispatch(appSetStatusAC('succeeded'))

				res.data.forEach((todolist) => {
					dispatch(fetchTasksTC(todolist.id))
				})

			} else {
				dispatch(appSetErrorAC('GET-TODOLISTS FAILED'))
				dispatch(appSetStatusAC('failed'))
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
	}
}

export function addTodolistTC(title: string) {
	return async (dispatch: AppThunkDispatchType) => {
		dispatch(appSetStatusAC('loading'))
		try {
			const res = await todolistsAPI.createTodolist(title)
			if (res.data.resultCode === 0) {
				dispatch(addTodolistAC(res.data.data.item))
				dispatch(appSetStatusAC('succeeded'))
			} else {
				handleServerAppError(res.data.messages, dispatch)
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
	}
}

export function removeTodolistTC(todolistId: string) {
	return async (dispatch: AppThunkDispatchType) => {
		dispatch(appSetStatusAC('loading'))
		dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
		try {
			const res = await todolistsAPI.deleteTodolist(todolistId)
			if (res.data.resultCode === 0) {
				dispatch(removeTodolistAC(todolistId))
				dispatch(appSetStatusAC('succeeded'))
			} else {
				handleServerAppError(res.data.messages, dispatch)
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
	}
}

export function updateTodolistTitleTC(todolistId: string, newTitle: string) {
	return async (dispatch: AppThunkDispatchType) => {
		dispatch(appSetStatusAC('loading'))
		dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
		try {
			const res = await todolistsAPI.updateTodolist(todolistId, newTitle)
			if (res.data.resultCode === 0) {
				dispatch(changeTodolistTitleAC(todolistId, newTitle))
				dispatch(appSetStatusAC('succeeded'))
				dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
			} else {
				handleServerAppError(res.data.messages, dispatch)
				dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
	}
}