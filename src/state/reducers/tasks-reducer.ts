import { RequestStatusType, todolistsActions } from './todolists-reducer'
import { ApiUpdateTaskModelType, ResultCode, TaskApiType, TaskPrioritiesEnum, tasksAPI, TaskStatusesEnum } from 'api'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'utils'
import { appActions } from 'state/reducers/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
	'tasks/fetchTasksTC',
	async (todolistId, thunkAPI) => {
		thunkAPI.dispatch(appActions.setStatus({ status: true }))
		try {
			const res = await tasksAPI.getTasks(todolistId)
			thunkAPI.dispatch(appActions.setStatus({ status: false }))
			return { tasks: res.data.items, todolistId }
		} catch (error) {
			handleServerNetworkError(error, thunkAPI.dispatch)
			return thunkAPI.rejectWithValue(null)
		}
	}
)

const addTaskTC = createAppAsyncThunk<{ newTaskFromAPI: TaskApiType }, { todolistId: string, newTitle: string }>(
	'tasks/addTaskTC',
	async ({ todolistId, newTitle }, thunkAPI) => {
		thunkAPI.dispatch(appActions.setStatus({ status: true }))
		thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
		try {
			const res = await tasksAPI.createTask(todolistId, newTitle)
			if (res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(appActions.setStatus({ status: false }))
				thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
				return { newTaskFromAPI: res.data.data.item }
			} else {
				handleServerAppError(res.data.messages, thunkAPI.dispatch)
				thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
				return thunkAPI.rejectWithValue(null)
			}
		} catch (error) {
			handleServerNetworkError(error, thunkAPI.dispatch)
			thunkAPI.dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'idle' }))
			return thunkAPI.rejectWithValue(null)
		}
	}
)

const updateTaskTC = createAppAsyncThunk<
	{ todolistId: string, taskId: string, taskUpdateModel: ApiUpdateTaskModelType },
	{ todolistId: string, taskId: string, taskUpdateModel: UiUpdateTaskModelType }>(
	'tasks/updateTaskTC',
	async ({ todolistId, taskId, taskUpdateModel }, thunkAPI) => {
		thunkAPI.dispatch(appActions.setStatus({ status: true }))
		thunkAPI.dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'loading' }))
		const taskToUpdate = thunkAPI.getState().tasksReducer[todolistId].filter(t => t.id === taskId)[0]
		if (!taskToUpdate) {
			thunkAPI.dispatch(appActions.setError({ error: 'Task not found' }))
			thunkAPI.dispatch(appActions.setStatus({ status: false }))
			thunkAPI.dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'idle' }))
			return thunkAPI.rejectWithValue(null)
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
			if (res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(appActions.setStatus({ status: false }))
				thunkAPI.dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'idle' }))
				return { todolistId, taskId, taskUpdateModel: model }
			} else {
				handleServerAppError(res.data.messages, thunkAPI.dispatch)
				thunkAPI.dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'idle' }))
				return thunkAPI.rejectWithValue(null)
			}
		} catch (error) {
			handleServerNetworkError(error, thunkAPI.dispatch)
			thunkAPI.dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'idle' }))
			return thunkAPI.rejectWithValue(null)
		}
	}
)

const removeTaskTC = createAppAsyncThunk<
	{ todolistId: string, taskId: string },
	{ todolistId: string, taskId: string }>(
	'tasks/removeTaskTC',
	async ({ todolistId, taskId }, thunkAPI) => {
		thunkAPI.dispatch(appActions.setStatus({ status: true }))
		thunkAPI.dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'loading' }))
		try {
			const res = await tasksAPI.deleteTask(todolistId, taskId)
			if (res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(appActions.setStatus({ status: false }))
				return { todolistId, taskId }
			} else {
				handleServerAppError(res.data.messages, thunkAPI.dispatch)
				return thunkAPI.rejectWithValue(null)
			}
		} catch (error) {
			handleServerNetworkError(error, thunkAPI.dispatch)
			return thunkAPI.rejectWithValue(null)
		}
	}
)

//========================================================================================
const initialState: TasksReducerType = {}

const slice = createSlice({
	name: 'tasks',
	initialState,

	reducers: {

		removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
			state[action.payload.todolistId] = state[action.payload.todolistId].filter(tsk => tsk.id !== action.payload.taskId)
		},

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
			.addCase(todolistsActions.addTodolist, (state, action) => {
				state[action.payload.newTodolistFromAPI.id] = []
			})
			.addCase(todolistsActions.removeTodolist, (state, action) => {
				delete state[action.payload.todolistId]
			})
			.addCase(todolistsActions.setTodolists, (state, action) => {
				const tasks: TasksReducerType = {}
				action.payload.todolistsFromAPI.forEach(tl => {
					tasks[tl.id] = []
				})
				return tasks
			})
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
	}
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasksTC, addTaskTC, updateTaskTC, removeTaskTC }
