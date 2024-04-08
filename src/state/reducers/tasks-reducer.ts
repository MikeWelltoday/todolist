import { RequestStatusType, todolistsActions } from './todolists-reducer'
import { AppDispatchType, AppRootStateType } from 'app/store'
import { ApiUpdateTaskModelType, TaskApiType, TaskPrioritiesEnum, tasksAPI, TaskStatusesEnum } from 'api'
import { handleServerAppError, handleServerNetworkError } from 'utils'
import { appActions } from 'state/reducers/app-reducer'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const fetchTasksTC = createAsyncThunk<
	{ tasks: TaskApiType[], todolistId: string },
	string,
	{ dispatch: AppDispatchType, rejectWithValue: null }
>('tasks/fetchTasksTC',
	async (todolistId: string, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		dispatch(appActions.setStatus({ status: true }))
		try {
			const res = await tasksAPI.getTasks(todolistId)
			const tasks = res.data.items
			dispatch(appActions.setStatus({ status: false }))
			return { tasks, todolistId }
		} catch (error) {
			handleServerNetworkError(error, dispatch)
			dispatch(appActions.setStatus({ status: false }))
			return rejectWithValue(null)
		}
	}
)


//========================================================================================
const initialState: TasksReducerType = {}

const slice = createSlice({
	name: 'tasks',
	initialState,

	reducers: {

		// setTasks: (state, action: PayloadAction<{ todolistId: string, tasksFromAPI: TaskApiType[] }>) => {
		// 	state[action.payload.todolistId] = action.payload.tasksFromAPI.map(tsk => ({
		// 		...tsk,
		// 		entityStatus: 'idle'
		// 	}))
		// },

		removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
			state[action.payload.todolistId] = state[action.payload.todolistId].filter(tsk => tsk.id !== action.payload.taskId)
		},

		addTask: (state, action: PayloadAction<{ newTaskFromAPI: TaskApiType }>) => {
			state[action.payload.newTaskFromAPI.todoListId].unshift({
				...action.payload.newTaskFromAPI,
				entityStatus: 'idle'
			})
		},

		updateTask: (state, action: PayloadAction<{
			todolistId: string,
			taskId: string,
			taskUpdateModel: UiUpdateTaskModelType
		}>) => {
			const tasks = state[action.payload.todolistId]
			const taskIndex = state[action.payload.todolistId].findIndex(tsk => tsk.id === action.payload.taskId)
			if (taskIndex >= 0) {
				tasks[taskIndex] = { ...tasks[taskIndex], ...action.payload.taskUpdateModel }
			}
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
				if (action.payload) {
					state[action.payload.todolistId] = action.payload.tasks.map(tsk => ({
						...tsk, entityStatus: 'idle'
					}))
				}
			})
	}
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasksTC }

//========================================================================================


// export function fetchTasksTC(todolistId: string) {
// 	return async (dispatch: AppDispatchType) => {
// 		dispatch(appActions.setStatus({ status: true }))
// 		try {
// 			const res = await tasksAPI.getTasks(todolistId)
// 			if (!res.data.error) {
// 				dispatch(tasksActions.setTasks({ todolistId, tasksFromAPI: res.data.items }))
// 			} else {
// 				if (res.data.error) {
// 					dispatch(appActions.setError({ error: res.data.error }))
// 				} else {
// 					dispatch(appActions.setError({ error: 'to get Tasks is failed' }))
// 				}
// 			}
// 		} catch (e) {
// 			handleServerNetworkError(e, dispatch)
// 		}
// 		dispatch(appActions.setStatus({ status: false }))
// 	}
// }


export function removeTaskTC(todolistId: string, taskId: string) {
	return async (dispatch: AppDispatchType) => {
		dispatch(appActions.setStatus({ status: true }))
		dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'loading' }))
		try {
			const res = await tasksAPI.deleteTask(todolistId, taskId)
			if (res.data.resultCode === 0) {
				dispatch(tasksActions.removeTask({ todolistId, taskId }))
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
		dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
		try {
			const res = await tasksAPI.createTask(todolistId, newTitle)
			if (res.data.resultCode === 0) {
				dispatch(tasksActions.addTask({ newTaskFromAPI: res.data.data.item }))
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


export function updateTaskTC(todolistId: string, taskId: string, taskUpdateModel: UiUpdateTaskModelType) {
	return async (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
		dispatch(appActions.setStatus({ status: true }))
		dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'loading' }))
		const taskToUpdate = getState().tasksReducer[todolistId].filter(t => t.id === taskId)[0]
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
				dispatch(tasksActions.updateTask({ todolistId, taskId, taskUpdateModel: model }))
			} else {
				handleServerAppError(res.data.messages, dispatch)
			}
		} catch (e) {
			handleServerNetworkError(e, dispatch)
		}
		dispatch(appActions.setStatus({ status: false }))
		dispatch(tasksActions.changeTasksEntityStatusAC({ todolistId, taskId, newStatus: 'idle' }))
	}
}


