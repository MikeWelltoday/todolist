import { TodolistApiType, todolistsAPI } from 'api'
import { handleServerAppError, handleServerNetworkError } from 'utils'
import { fetchTasksTC } from './tasks-reducer'
import { appActions } from 'state/reducers/app-reducer'
import { AppDispatchType } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//========================================================================================

export type TodolistFilterReducerType = 'all' | 'active' | 'completed'
export type RequestStatusType = 'idle' | 'loading'

export type TodolistReducerType = TodolistApiType & {
	filter: TodolistFilterReducerType
	entityStatus: RequestStatusType
}

//========================================================================================

const initialState: TodolistReducerType[] = []

const slice = createSlice({
	name: 'todolists',
	initialState,
	reducers: {

		removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
			return state.filter(t => t.id !== action.payload.todolistId)
		},

		addTodolist: (state, action: PayloadAction<{ newTodolistFromAPI: TodolistApiType }>) => {
			state.unshift({ ...action.payload.newTodolistFromAPI, filter: 'all', entityStatus: 'idle' })
		},

		changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
			const todolist = state.find(t => t.id === action.payload.todolistId)
			if (todolist) {
				todolist.title = action.payload.title
			}
		},

		changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string, filter: TodolistFilterReducerType }>) => {
			const todolist = state.find(t => t.id === action.payload.todolistId)
			if (todolist) {
				todolist.filter = action.payload.filter
			}
		},

		setTodolists: (state, action: PayloadAction<{ todolistsFromAPI: TodolistApiType[] }>) => {
			return action.payload.todolistsFromAPI.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
		},

		changeTodolistEntityStatus: (state, action: PayloadAction<{
			todolistId: string,
			newStatus: RequestStatusType
		}>) => {
			const todolist = state.find(t => t.id === action.payload.todolistId)
			if (todolist) {
				todolist.entityStatus = action.payload.newStatus
			}
		}
	}
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions


//=======================================================================================

export function fetchTodolistsTC() {
	return async (dispatch: AppDispatchType) => {
		dispatch(appActions.setStatus({ status: true }))
		try {
			const res = await todolistsAPI.getTodolist()
			if (res.data.length) {
				dispatch(todolistsActions.setTodolists({ todolistsFromAPI: res.data }))
				res.data.forEach((todolist) => {
					dispatch(fetchTasksTC(todolist.id))
				})

			} else {
				dispatch(appActions.setError({ error: 'to get Todolists is failed' }))
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
		dispatch(appActions.setStatus({ status: false }))
	}
}


export function addTodolistTC(title: string) {
	return async (dispatch: AppDispatchType) => {
		dispatch(appActions.setStatus({ status: true }))
		try {
			const res = await todolistsAPI.createTodolist(title)
			if (res.data.resultCode === 0) {
				dispatch(todolistsActions.addTodolist({ newTodolistFromAPI: res.data.data.item }))
			} else {
				handleServerAppError(res.data.messages, dispatch)
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
		dispatch(appActions.setStatus({ status: false }))
	}
}

export function removeTodolistTC(todolistId: string) {
	return async (dispatch: AppDispatchType) => {
		dispatch(appActions.setStatus({ status: true }))
		dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
		try {
			const res = await todolistsAPI.deleteTodolist(todolistId)
			if (res.data.resultCode === 0) {
				dispatch(todolistsActions.removeTodolist({ todolistId }))
			} else {
				handleServerAppError(res.data.messages, dispatch)
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
		dispatch(appActions.setStatus({ status: false }))
	}
}

export function updateTodolistTitleTC(todolistId: string, newTitle: string) {
	return async (dispatch: AppDispatchType) => {
		dispatch(appActions.setStatus({ status: true }))
		dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
		try {
			const res = await todolistsAPI.updateTodolist(todolistId, newTitle)
			if (res.data.resultCode === 0) {
				dispatch(todolistsActions.changeTodolistTitle({ todolistId, title: newTitle }))
			} else {
				handleServerAppError(res.data.messages, dispatch)
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
		dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
		dispatch(appActions.setStatus({ status: false }))
	}
}