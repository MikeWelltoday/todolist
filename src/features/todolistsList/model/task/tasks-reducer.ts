import {
	RequestStatusType,
	todolistsActions,
	todolistsThunks
} from 'features/todolistsList/model/todolist/todolists-reducer'

import { createAppAsyncThunk, handleServerError, handleNetworkError } from 'utils'
import { appActions } from 'state/reducers/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authThunks } from 'state/reducers/auth-reducer'
import {
	ApiUpdateTaskModelType,
	TaskApiType,
	TaskPrioritiesEnum,
	tasksAPI,
	TaskStatusesEnum
} from 'features/todolistsList/api/tasks-api'
import { ResultCodeEnum } from 'api/result-code'

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

const fetchTasksTC = createAppAsyncThunk<{ tasks: TaskApiType[], todolistId: string }, string>(
	'tasksReducer/fetchTasksTC',
	async (todolistId, { dispatch, rejectWithValue }) => {
		// dispatch(appActions.setStatus({ status: 'loading' }))
		try {
			const res = await tasksAPI.getTasks(todolistId)
			// dispatch(appActions.setStatus({ status: 'idle' }))
			return { tasks: res.data.items, todolistId }
		} catch (error) {
			handleNetworkError(error, dispatch)
			return rejectWithValue(null)
		}
	}
)

const addTaskTC = createAppAsyncThunk<{ newTaskFromAPI: TaskApiType }, { todolistId: string, newTitle: string }>(
	'tasksReducer/addTaskTC',
	async ({ todolistId, newTitle }, { dispatch, rejectWithValue }) => {
		// dispatch(appActions.setStatus({ status: 'loading' }))
		dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
		try {
			const res = await tasksAPI.createTask(todolistId, newTitle)
			if (res.data.resultCode === ResultCodeEnum.Success) {
				// dispatch(appActions.setStatus({ status: 'idle' }))
				dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
				return { newTaskFromAPI: res.data.data.item }
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

const updateTaskTC = createAppAsyncThunk<
	{ todolistId: string, taskId: string, taskUpdateModel: ApiUpdateTaskModelType },
	{ todolistId: string, taskId: string, taskUpdateModel: UiUpdateTaskModelType }>(
	'tasksReducer/updateTaskTC',
	async ({ todolistId, taskId, taskUpdateModel }, { dispatch, rejectWithValue, getState }) => {
		// dispatch(appActions.setStatus({ status: 'loading' }))
		dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'loading' }))
		const taskToUpdate = getState().tasksReducer[todolistId].filter(t => t.id === taskId)[0]
		if (!taskToUpdate) {
			dispatch(appActions.setError({ error: 'Task not found' }))
			// dispatch(appActions.setStatus({ status: 'idle' }))
			dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'idle' }))
			return rejectWithValue(null)
		}
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
			if (res.data.resultCode === ResultCodeEnum.Success) {
				// dispatch(appActions.setStatus({ status: 'idle' }))
				dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'idle' }))
				return { todolistId, taskId, taskUpdateModel: model }
			} else {
				handleServerError(res.data.messages, dispatch)
				dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'idle' }))
				return rejectWithValue(null)
			}
		} catch (error) {
			handleNetworkError(error, dispatch)
			dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'idle' }))
			return rejectWithValue(null)
		}
	}
)

const removeTaskTC = createAppAsyncThunk<
	{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }>(
	'tasksReducer/removeTaskTC',
	async ({ todolistId, taskId }, { dispatch, rejectWithValue }) => {
		// dispatch(appActions.setStatus({ status: 'loading' }))
		dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'loading' }))
		try {
			const res = await tasksAPI.deleteTask(todolistId, taskId)
			if (res.data.resultCode === ResultCodeEnum.Success) {
				// dispatch(appActions.setStatus({ status: 'idle' }))
				return { todolistId, taskId }
			} else {
				handleServerError(res.data.messages, dispatch)
				return rejectWithValue(null)
			}
		} catch (error) {
			handleNetworkError(error, dispatch)
			return rejectWithValue(null)
		}
	}
)

//========================================================================================
const initialState: TasksReducerType = {}

const slice = createSlice({
	name: 'tasksReducer',
	initialState,

	reducers: {
		changeTasksEntityStatusAC: (state, action: PayloadAction<{
			todolistId: string,
			taskId: string,
			newStatus: RequestStatusType
		}>) => {
			const tasks = state[action.payload.todolistId]
			const taskIndex = state[action.payload.todolistId].findIndex(tsk => tsk.id === action.payload.taskId)
			if (taskIndex >= 0) {
				tasks[taskIndex] = { ...tasks[taskIndex], entityStatus: action.payload.newStatus }
			}
		}
	},

	extraReducers: builder => {
		builder
			.addCase(fetchTasksTC.fulfilled, (state, action) => {
				state[action.payload.todolistId] = action.payload.tasks.map(tsk => ({
					...tsk, entityStatus: 'idle'
				}))
			})
			.addCase(addTaskTC.fulfilled, (state, action) => {
				state[action.payload.newTaskFromAPI.todoListId].unshift({
					...action.payload.newTaskFromAPI,
					entityStatus: 'idle'
				})
			})
			.addCase(updateTaskTC.fulfilled, (state, action) => {
				const tasks = state[action.payload.todolistId]
				const taskIndex = state[action.payload.todolistId].findIndex(tsk => tsk.id === action.payload.taskId)
				if (taskIndex >= 0) {
					tasks[taskIndex] = { ...tasks[taskIndex], ...action.payload.taskUpdateModel }
				}
			})
			.addCase(removeTaskTC.fulfilled, (state, action) => {
				state[action.payload.todolistId] = state[action.payload.todolistId].filter(tsk => tsk.id !== action.payload.taskId)
			})
			.addCase(todolistsThunks.fetchTodolistsTC.fulfilled, (state, action) => {
				const tasks: TasksReducerType = {}
				action.payload.todolistsFromAPI.forEach(tl => {
					tasks[tl.id] = []
				})
				return tasks
			})
			.addCase(authThunks.authLogoutTC.fulfilled, () => {
				return {}
			})
			.addCase(todolistsThunks.addTodolistTC.fulfilled, (state, action) => {
				state[action.payload.newTodolistFromAPI.id] = []
			})
			.addCase(todolistsThunks.removeTodolistTC.fulfilled, (state, action) => {
				delete state[action.payload.todolistId]
			})
	}
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasksTC, addTaskTC, updateTaskTC, removeTaskTC }