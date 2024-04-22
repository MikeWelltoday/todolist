import { todolistsActions } from 'features/todolist/model/todolistsSlice'
import { appActions } from 'state/appSlice/appSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { ApiUpdatedTaskModelType, TaskApiType, tasksAPI, TasksAxiosResponseType } from 'features/tasks/api/tasksAPI'
import { RequestEntityStatusType, ResultCodeEnum, TaskPrioritiesEnum, TaskStatusesEnum } from '../../../shared'
import { createAppSlice } from '../../../state'
import { AppDispatchType, AppRootStateType } from '../../../state/store/store'
import { TodolistApiType } from '../../todolist/api/todolistsAPI'
import { authActions } from '../../../entities/authSlice/authSlice'


export type UiTaskToUpdateModelType = {
	title?: string
	description?: string
	status?: TaskStatusesEnum
	priority?: TaskPrioritiesEnum
	startDate?: string
	deadline?: string
}

export type TaskType = TaskApiType & {
	entityStatus: RequestEntityStatusType
}

export type TasksReducerType = {
	[key: string]: TaskType[]
}

const initialState: TasksReducerType = {}

const slice = createAppSlice({
	name: 'tasksSlice',
	initialState,
	reducers: (creators) => {
		return {

			changeTasksEntityStatusAction: creators.reducer((state, action: PayloadAction<{
				todolistId: string, taskId: string, newStatus: RequestEntityStatusType
			}>) => {
				const tasks = state[action.payload.todolistId]
				const taskIndex = state[action.payload.todolistId].findIndex(tsk => tsk.id === action.payload.taskId)
				if (taskIndex >= 0) {
					tasks[taskIndex] = { ...tasks[taskIndex], entityStatus: action.payload.newStatus }
				}
			}),

			fetchTasksThunk: creators.asyncThunk<{ tasks: TaskApiType[], todolistId: string },
				string, { rejectValue: null }>(
				async (todolistId, thunkAPI) => {
					const res = await tasksAPI.getTasks(todolistId)
					// чтообы даже пустой туулист не летел в ошибки
					if (res.data.items.length >= 0) {
						return { tasks: res.data.items, todolistId }
					} else {
						return thunkAPI.rejectWithValue(null)
					}
				}, {
					fulfilled: (state, action) => {
						state[action.payload.todolistId] = action.payload.tasks.map(tsk => ({
							...tsk, entityStatus: 'idle'
						}))
					}
				}
			),

			addTaskThunk: creators.asyncThunk<{ newTaskFromAPI: TaskApiType },
				{ todolistId: string, newTitle: string }, { rejectValue: TasksAxiosResponseType }>(
				async ({ todolistId, newTitle }, thunkAPI) => {
					const dispatch = thunkAPI.dispatch as AppDispatchType
					dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'loading' }))
					const res = await tasksAPI.createTask(todolistId, newTitle)
					dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'idle' }))
					if (res.data.resultCode === ResultCodeEnum.Success) {
						return { newTaskFromAPI: res.data.data.item }
					} else {
						return thunkAPI.rejectWithValue(res.data)
					}
				}, {
					fulfilled: (state, action) => {
						state[action.payload.newTaskFromAPI.todoListId].unshift({
							...action.payload.newTaskFromAPI, entityStatus: 'idle'
						})
					}
				}
			),

			removeTaskThunk: creators.asyncThunk<{ todolistId: string, taskId: string },
				{ todolistId: string, taskId: string }, { rejectValue: TasksAxiosResponseType<{}> }>(
				async ({ todolistId, taskId }, thunkAPI) => {
					const dispatch = thunkAPI.dispatch as AppDispatchType
					dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'loading' }))
					const res = await tasksAPI.deleteTask(todolistId, taskId)
					dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'idle' }))
					if (res.data.resultCode === ResultCodeEnum.Success) {
						return { todolistId, taskId }
					} else {
						return thunkAPI.rejectWithValue(res.data)
					}
				}, {
					fulfilled: (state, action) => {
						state[action.payload.todolistId] = state[action.payload.todolistId].filter(tsk => tsk.id !== action.payload.taskId)
					}
				}
			),

			updateTaskThunk: creators.asyncThunk<
				{ todolistId: string, taskId: string, taskUpdatedModel: ApiUpdatedTaskModelType },
				{ todolistId: string, taskId: string, taskToUpdateModel: UiTaskToUpdateModelType },
				{ rejectValue: TasksAxiosResponseType | null }>(
				async ({ todolistId, taskId, taskToUpdateModel }, thunkAPI) => {
					const dispatch = thunkAPI.dispatch as AppDispatchType
					dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'loading' }))

					const taskToUpdate = (thunkAPI.getState() as AppRootStateType).tasksSlice[todolistId].filter(t => t.id === taskId)[0]
					if (!taskToUpdate) {
						dispatch(appActions.setErrorAction({ error: 'Task To Update Not Found' }))
						dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'idle' }))
						return thunkAPI.rejectWithValue(null)
					}

					const model: ApiUpdatedTaskModelType = {
						title: taskToUpdate.title,
						description: taskToUpdate.description,
						status: taskToUpdate.status,
						priority: taskToUpdate.priority,
						startDate: taskToUpdate.startDate,
						deadline: taskToUpdate.deadline,
						...taskToUpdateModel
					}

					const res = await tasksAPI.updateTask(todolistId, taskId, model)
					dispatch(todolistsActions.changeTodolistEntityStatusAction({ todolistId, newStatus: 'idle' }))

					if (res.data.resultCode === ResultCodeEnum.Success) {
						return { todolistId, taskId, taskUpdatedModel: model }
					} else {
						return thunkAPI.rejectWithValue(res.data)
					}
				}, {
					fulfilled: (state, action) => {
						const tasks = state[action.payload.todolistId]
						const taskIndex = state[action.payload.todolistId].findIndex(tsk => tsk.id === action.payload.taskId)
						if (taskIndex >= 0) {
							tasks[taskIndex] = { ...tasks[taskIndex], ...action.payload.taskUpdatedModel }
						}
					}
				}
			)

		}
	},

	extraReducers: builder => {
		builder
			.addCase(todolistsActions.fetchTodolistsThunk.fulfilled, (state, action) => {
				const tasks: TasksReducerType = {}
				action.payload.todolistsFromAPI.forEach((tl: TodolistApiType) => {
					tasks[tl.id] = []
				})
				return tasks
			})
			.addCase(todolistsActions.addTodolistThunk.fulfilled, (state, action) => {
				state[action.payload.newTodolistFromAPI.id] = []
			})
			.addCase(todolistsActions.removeTodolistThunk.fulfilled, (state, action) => {
				delete state[action.payload.todolistId]
			})
			.addCase(authActions.logoutThunk.fulfilled, () => {
				return {}
			})
	}
})

/**
 * ⛔ SLICE   импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ ACTIONS импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ THUNKS  импортировать напрямую из файла => если черещ index, то будет ошибка
 */

export const tasksSlice = slice.reducer
export const tasksActions = slice.actions