import { PayloadAction } from '@reduxjs/toolkit'
import { RequestEntityStatusType, ResultCodeEnum, SlicesNamesTypes } from 'shared'
import { TodolistApiType, todolistsAPI, TodolistsApiResponseType } from '../api/todolistsAPI'
import { createAppSlice } from 'state'
import { AppDispatchType } from 'state/store/store'
import { authActions } from 'entities/authSlice/authSlice'
import { tasksActions } from '../../tasks/model/tasksSlice'

//========================================================================================

export type TodolistFilterType = 'all' | 'active' | 'completed'

export type TodolistUiType = TodolistApiType & {
	filter: TodolistFilterType
	entityStatus: RequestEntityStatusType
}

//========================================================================================

const slice = createAppSlice({
	name: SlicesNamesTypes.todolistsSlice,
	initialState: [] as TodolistUiType[],

	reducers: (creators) => {
		return {

			changeTodolistFilterAction: creators.reducer((state, action: PayloadAction<
				{ todolistId: string, filter: TodolistFilterType }>) => {
				const todolist = state.find(t => t.id === action.payload.todolistId)
				if (todolist) {
					todolist.filter = action.payload.filter
				}
			}),

			changeTodolistEntityStatusAction: creators.reducer((state, action: PayloadAction<
				{ todolistId: string, newStatus: RequestEntityStatusType }>) => {
				const todolist = state.find(t => t.id === action.payload.todolistId)
				if (todolist) {
					todolist.entityStatus = action.payload.newStatus
				}
			}),

			fetchTodolistsThunk: creators.asyncThunk<{ todolistsFromAPI: TodolistApiType[] },
				undefined, { rejectValue: null }>(
				async (_, thunkAPI) => {
					const dispatch = thunkAPI.dispatch as AppDispatchType
					const res = await todolistsAPI.getTodolist()
					if (res.data.length) {
						res.data.forEach((todolist) => {
							dispatch(tasksActions.fetchTasksThunk(todolist.id))
						})
						return { todolistsFromAPI: res.data }
					} else {
						// в документации к API нет возврата ошибки => обрабатываем ошибку в appSlice
						return thunkAPI.rejectWithValue(null)
					}
				},
				{
					fulfilled: (state, action) => {
						return action.payload.todolistsFromAPI.map(tl =>
							({ ...tl, filter: 'all', entityStatus: 'idle' }))
					}
				}
			),

			addTodolistThunk: creators.asyncThunk<{ newTodolistFromAPI: TodolistApiType },
				string, { rejectValue: TodolistsApiResponseType<{ item: TodolistApiType }> }>(
				async (title, thunkAPI) => {
					const res = await todolistsAPI.createTodolist(title)
					if (res.data.resultCode === ResultCodeEnum.Success) {
						return { newTodolistFromAPI: res.data.data.item }
					} else {
						return thunkAPI.rejectWithValue(res.data)
					}
				}, {
					fulfilled: (state, action) => {
						state.unshift({ ...action.payload.newTodolistFromAPI, filter: 'all', entityStatus: 'idle' })
					}
				}
			),

			removeTodolistThunk: creators.asyncThunk<{ todolistId: string },
				string, { rejectValue: TodolistsApiResponseType }>(
				async (todolistId, thunkAPI) => {
					const dispatch = thunkAPI.dispatch as AppDispatchType
					dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'loading' }))
					const res = await todolistsAPI.deleteTodolist(todolistId)
					dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'idle' }))
					if (res.data.resultCode === ResultCodeEnum.Success) {
						return { todolistId }
					} else {
						return thunkAPI.rejectWithValue(res.data)
					}
				}, {
					fulfilled: (state, action) => {
						return state.filter(t => t.id !== action.payload.todolistId)
					}
				}
			),

			updateTodolistTitleThunk: creators.asyncThunk<{ todolistId: string, newTitle: string },
				{ todolistId: string, newTitle: string }, { rejectValue: TodolistsApiResponseType }>(
				async ({ todolistId, newTitle }, thunkAPI) => {
					const dispatch = thunkAPI.dispatch as AppDispatchType
					dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'loading' }))
					const res = await todolistsAPI.updateTodolist(todolistId, newTitle)
					dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'idle' }))
					if (res.data.resultCode === ResultCodeEnum.Success) {
						return { todolistId, newTitle }
					} else {
						return thunkAPI.rejectWithValue(res.data)
					}
				}, {
					fulfilled: (state, action) => {
						const todolist = state.find(t => t.id === action.payload.todolistId)
						if (todolist) {
							todolist.title = action.payload.newTitle
						}
					}
				}
			)

		}
	},

	extraReducers: builder => {
		builder
			.addCase(authActions.logoutThunk.fulfilled, () => {
				return []
			})
	},

	selectors: {
		selectTodolists: sliceState => sliceState
	}

})

//========================================================================================

/**
 * ⛔ SLICE     импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ THUNKS    импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ ACTIONS   импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ SELECTORS импортировать напрямую из файла => если черещ index, то будет ошибка
 */

export const todolistsSlice = slice.reducer
export const todolistsActions = slice.actions
export const todolistsSelectors = slice.selectors