export const todolistsRTK1 = 1

// import { ResultCodeEnum, TodolistApiType, todolistsAPI } from 'api'
// import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'utils'
// import { tasksThunks } from './tasks-reducer'
// import { appActions } from 'state/reducers/app-reducer'
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { authThunks } from 'state/reducers/auth-reducer'
//
// //========================================================================================
//
// export type TodolistFilterReducerType = 'all' | 'active' | 'completed'
// export type RequestStatusType = 'idle' | 'loading'
//
// export type TodolistReducerType = TodolistApiType & {
// 	filter: TodolistFilterReducerType
// 	entityStatus: RequestStatusType
// }
//
// //========================================================================================
//
// const fetchTodolistsTC = createAppAsyncThunk<{ todolistsFromAPI: TodolistApiType[] }, {}>(
// 	'todolists/fetchTodolists',
// 	async ({}, thunkAPI) => {
// 		thunkAPI.dispatch(appActions.setStatus({ status: 'loading' }))
// 		try {
// 			const res = await todolistsAPI.getTodolist()
// 			if (res.data.length) {
// 				res.data.forEach((todolist) => {
// 					thunkAPI.dispatch(tasksThunks.fetchTasksTC(todolist.id))
// 				})
// 				thunkAPI.dispatch(appActions.setStatus({ status: 'idle' }))
// 				return { todolistsFromAPI: res.data }
// 			} else {
// 				thunkAPI.dispatch(appActions.setError({ error: 'to get Todolists is failed' }))
// 				return thunkAPI.rejectWithValue(null)
// 			}
// 		} catch (error) {
// 			handleServerNetworkError(error, thunkAPI.dispatch)
// 			return thunkAPI.rejectWithValue(null)
// 		}
// 	}
// )
//
// const addTodolistTC = createAppAsyncThunk<{ newTodolistFromAPI: TodolistApiType }, string>(
// 	'todolists/addTodolistTC',
// 	async (title, thunkAPI) => {
// 		thunkAPI.dispatch(appActions.setStatus({ status: 'loading' }))
// 		try {
// 			const res = await todolistsAPI.createTodolist(title)
// 			if (res.data.resultCode === ResultCodeEnum.Success) {
// 				thunkAPI.dispatch(appActions.setStatus({ status: 'idle' }))
// 				return { newTodolistFromAPI: res.data.data.item }
// 			} else {
// 				handleServerAppError(res.data.messages, thunkAPI.dispatch)
// 				return thunkAPI.rejectWithValue(null)
// 			}
// 		} catch (error) {
// 			handleServerNetworkError(error, thunkAPI.dispatch)
// 			return thunkAPI.rejectWithValue(null)
// 		}
// 	}
// )
//
// const removeTodolistTC = createAppAsyncThunk<{ todolistId: string }, string>(
// 	'todolists/removeTodolistTC',
// 	async (todolistId, thunkAPI) => {
// 		thunkAPI.dispatch(appActions.setStatus({ status: 'loading' }))
// 		thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
// 		try {
// 			const res = await todolistsAPI.deleteTodolist(todolistId)
// 			if (res.data.resultCode === ResultCodeEnum.Success) {
// 				thunkAPI.dispatch(appActions.setStatus({ status: 'idle' }))
// 				thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
// 				return { todolistId }
// 			} else {
// 				handleServerAppError(res.data.messages, thunkAPI.dispatch)
// 				thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
// 				return thunkAPI.rejectWithValue(null)
// 			}
// 		} catch (error) {
// 			handleServerNetworkError(error, thunkAPI.dispatch)
// 			thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
// 			return thunkAPI.rejectWithValue(null)
// 		}
// 	}
// )
//
// const updateTodolistTitleTC = createAppAsyncThunk<{ todolistId: string, title: string },
// 	{ todolistId: string, newTitle: string }>(
// 	'todolists/updateTodolistTitleTC',
// 	async ({ todolistId, newTitle }, thunkAPI) => {
// 		thunkAPI.dispatch(appActions.setStatus({ status: 'loading' }))
// 		thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
// 		try {
// 			const res = await todolistsAPI.updateTodolist(todolistId, newTitle)
// 			if (res.data.resultCode === ResultCodeEnum.Success) {
// 				thunkAPI.dispatch(appActions.setStatus({ status: 'idle' }))
// 				thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
// 				return { todolistId, title: newTitle }
// 			} else {
// 				handleServerAppError(res.data.messages, thunkAPI.dispatch)
// 				thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
// 				return thunkAPI.rejectWithValue(null)
// 			}
// 		} catch (error) {
// 			handleServerNetworkError(error, thunkAPI.dispatch)
// 			thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
// 			return thunkAPI.rejectWithValue(null)
// 		}
// 	}
// )
//
// //========================================================================================
//
// const initialState: TodolistReducerType[] = []
//
// const slice = createSlice({
// 	name: 'todolists',
// 	initialState,
// 	reducers: {
// 		changeTodolistFilter: (state, action: PayloadAction<{
// 			todolistId: string,
// 			filter: TodolistFilterReducerType
// 		}>) => {
// 			const todolist = state.find(t => t.id === action.payload.todolistId)
// 			if (todolist) {
// 				todolist.filter = action.payload.filter
// 			}
// 		},
// 		changeTodolistEntityStatus: (state, action: PayloadAction<{
// 			todolistId: string,
// 			newStatus: RequestStatusType
// 		}>) => {
// 			const todolist = state.find(t => t.id === action.payload.todolistId)
// 			if (todolist) {
// 				todolist.entityStatus = action.payload.newStatus
// 			}
// 		}
// 	},
// 	extraReducers: builder => {
// 		builder
// 			.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
// 				return action.payload.todolistsFromAPI.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
// 			})
// 			.addCase(addTodolistTC.fulfilled, (state, action) => {
// 				state.unshift({ ...action.payload.newTodolistFromAPI, filter: 'all', entityStatus: 'idle' })
// 			})
// 			.addCase(todolistsThunks.removeTodolistTC.fulfilled, (state, action) => {
// 				return state.filter(t => t.id !== action.payload.todolistId)
// 			})
// 			.addCase(todolistsThunks.updateTodolistTitleTC.fulfilled, (state, action) => {
// 				const todolist = state.find(t => t.id === action.payload.todolistId)
// 				if (todolist) {
// 					todolist.title = action.payload.title
// 				}
// 			})
// 			.addCase(authThunks.authLogoutTC.fulfilled, (state, action) => {
// 				return []
// 			})
// 	}
// })
//
// export const todolistsReducer = slice.reducer
// export const todolistsActions = slice.actions
// export const todolistsThunks = { fetchTodolistsTC, addTodolistTC, removeTodolistTC, updateTodolistTitleTC }