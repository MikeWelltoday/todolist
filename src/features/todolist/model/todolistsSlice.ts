import { tasksThunks } from 'features/tasks/model/tasksSlice'
import { appActions } from 'state/appSlice/appSlice'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleNetworkError, handleServerError, RequestEntityStatusType, ResultCodeEnum } from '../../../shared'
import { createAppAsyncThunk } from '../../../state/utils/createAppAsyncThunk'
import { TodolistApiType, todolistsAPI } from '../api/todolistsAPI'
import { authThunks } from '../../../entities/authSlice/authSlice'


export type TodolistFilterReducerType = 'all' | 'active' | 'completed'


export type TodolistReducerType = TodolistApiType & {
	filter: TodolistFilterReducerType
	entityStatus: RequestEntityStatusType
}


const fetchTodolistsTC = createAppAsyncThunk<{ todolistsFromAPI: TodolistApiType[] }, undefined>(
	'todolistsReducer/fetchTodolists',
	async (_, { dispatch, rejectWithValue }) => {
		// dispatch(appActions.setStatus({ status: 'loading' }))
		try {
			const res = await todolistsAPI.getTodolist()
			if (res.data.length) {
				res.data.forEach((todolist) => {
					dispatch(tasksThunks.fetchTasksTC(todolist.id))
				})
				// dispatch(appActions.setStatus({ status: 'idle' }))
				return { todolistsFromAPI: res.data }
			} else {
				dispatch(appActions.setError({ error: 'to get Todolists is failed' }))
				return rejectWithValue(null)
			}
		} catch (error) {
			handleNetworkError(error, dispatch)
			return rejectWithValue(null)
		}
	}
)

const addTodolistTC = createAsyncThunk<{ newTodolistFromAPI: TodolistApiType }, string>(
	'todolistsReducer/addTodolistTC',
	async (title, { rejectWithValue }) => {
		const res = await todolistsAPI.createTodolist(title)
		// const res = await todolistsAPI.createTodolist(title)
		if (res.data.resultCode === ResultCodeEnum.Success) {
			return { newTodolistFromAPI: res.data.data.item }
		} else {
			return rejectWithValue(res.data)
		}
	}
)

// const addTodolistTC = createAppAsyncThunk<{ newTodolistFromAPI: TodolistApiType }, string>(
// 	'todolistsReducer/addTodolistTC',
// 	async (title, { dispatch, rejectWithValue }) => {
// 		// dispatch(appActions.setStatus({ status: 'loading' }))
// 		try {
// 			const res = await todolistsAPI.createTodolist(title)
// 			if (res.data.resultCode === ResultCodeEnum.Success) {
// 				// dispatch(appActions.setStatus({ status: 'idle' }))
// 				return { newTodolistFromAPI: res.data.data.item }
// 			} else {
// 				handleServerError(res.data.messages, dispatch)
// 				return rejectWithValue(null)
// 			}
// 		} catch (error) {
// 			handleNetworkError(error, dispatch)
// 			return rejectWithValue(null)
// 		}
// 	}
// )

const removeTodolistTC = createAsyncThunk<{ todolistId: string }, string>(
	'todolistsReducer/removeTodolistTC',
	async (todolistId, { dispatch, rejectWithValue }) => {
		dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
		const res = await todolistsAPI.deleteTodolist(todolistId)
			.finally(() => dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' })))
		if (res.data.resultCode === ResultCodeEnum.Success) {
			return { todolistId }
		} else {
			return rejectWithValue(res.data)
		}
	}
)

// const removeTodolistTC = createAppAsyncThunk<{ todolistId: string }, string>(
// 	'todolistsReducer/removeTodolistTC',
// 	async (todolistId, { dispatch, rejectWithValue }) => {
// 		dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
// 		try {
// 			const res = await todolistsAPI.deleteTodolist(todolistId)
// 			if (res.data.resultCode === ResultCodeEnum.Success) {
// 				dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
// 				return { todolistId }
// 			} else {
// 				handleServerError(res.data.messages, dispatch)
// 				dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
// 				return rejectWithValue(null)
// 			}
// 		} catch (error) {
// 			handleNetworkError(error, dispatch)
// 			dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
// 			return rejectWithValue(null)
// 		}
// 	}
// )

const updateTodolistTitleTC = createAppAsyncThunk<
	{ todolistId: string, title: string }, { todolistId: string, newTitle: string }>(
	'todolistsReducer/updateTodolistTitleTC',
	async ({ todolistId, newTitle }, { dispatch, rejectWithValue }) => {
		// dispatch(appActions.setStatus({ status: 'loading' }))
		dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
		try {
			const res = await todolistsAPI.updateTodolist(todolistId, newTitle)
			if (res.data.resultCode === ResultCodeEnum.Success) {
				// dispatch(appActions.setStatus({ status: 'idle' }))
				dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
				return { todolistId, title: newTitle }
			} else {
				handleServerError(res.data.messages, dispatch)
				dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
				return rejectWithValue(null)
			}
		} catch (error) {
			handleNetworkError(error, dispatch)
			dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
			return rejectWithValue(null)
		}
	}
)


const initialState: TodolistReducerType[] = []

const slice = createSlice({
	name: 'todolistsReducer',
	initialState,
	reducers: {
		changeTodolistFilter: (state, action: PayloadAction<{
			todolistId: string,
			filter: TodolistFilterReducerType
		}>) => {
			const todolist = state.find(t => t.id === action.payload.todolistId)
			if (todolist) {
				todolist.filter = action.payload.filter
			}
		},
		changeTodolistEntityStatus: (state, action: PayloadAction<{
			todolistId: string,
			newStatus: RequestEntityStatusType
		}>) => {
			const todolist = state.find(t => t.id === action.payload.todolistId)
			if (todolist) {
				todolist.entityStatus = action.payload.newStatus
			}
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
				return action.payload.todolistsFromAPI.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
			})
			.addCase(addTodolistTC.fulfilled, (state, action) => {
				state.unshift({ ...action.payload.newTodolistFromAPI, filter: 'all', entityStatus: 'idle' })
			})
			.addCase(todolistsThunks.removeTodolistTC.fulfilled, (state, action) => {
				return state.filter(t => t.id !== action.payload.todolistId)
			})
			.addCase(todolistsThunks.updateTodolistTitleTC.fulfilled, (state, action) => {
				const todolist = state.find(t => t.id === action.payload.todolistId)
				if (todolist) {
					todolist.title = action.payload.title
				}
			})
			.addCase(authThunks.authLogoutTC.fulfilled, () => {
				return []
			})
	}
})

/**
 * ⛔ SLICE   импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ ACTIONS импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ THUNKS  импортировать напрямую из файла => если черещ index, то будет ошибка
 */
export const todolistsSlice = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { fetchTodolistsTC, addTodolistTC, removeTodolistTC, updateTodolistTitleTC }