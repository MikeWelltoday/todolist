import { isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { tasksActions } from '../../features/tasks/model/tasksSlice'
import { todolistsActions } from '../../features/todolist/model/todolistsSlice'
import { authActions } from '../../entities/authSlice/authSlice'
import { createAppSlice } from '../utils/createAppSlice'


export type AppErrorType = string | null
export type StatusType = 'idle' | 'loading'

export type AppReducerType = {
	status: StatusType,
	error: AppErrorType
	isAppInitialized: boolean
}

const initialState: AppReducerType = {
	status: 'idle',
	error: null,
	isAppInitialized: false
}

const slice = createAppSlice({
	name: 'appSlice',
	initialState,
	reducers: (creators) => {
		return {

			setStatusAction: creators.reducer((state, action: PayloadAction<{ status: StatusType }>) => {
				state.status = action.payload.status
			}),

			setErrorAction: creators.reducer((state, action: PayloadAction<{ error: AppErrorType }>) => {
				state.error = action.payload.error
			}),

			setInitializationAction: creators.reducer((state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
				state.isAppInitialized = action.payload.isAppInitialized
			})

		}
	},

	extraReducers: builder => {
		builder
			.addMatcher(isPending, (state, action: any) => {
				if (action.type === authActions.initializationThunk.pending.type) {
					return
				}
				state.status = 'loading'
			})
			.addMatcher(isFulfilled, (state, action: any) => {
				if (action.type === authActions.initializationThunk.pending.type) {
					return
				}
				state.status = 'idle'
			})
			.addMatcher(isRejected, (state, action: any) => {
					state.status = 'idle'
					if (action.payload && action.payload.messages) {
						console.log('🟡 SERVER => ', action)
						if (action.type === todolistsActions.addTodolistThunk.rejected.type ||
							action.type === tasksActions.addTaskThunk.rejected.type ||
							action.type === authActions.initializationThunk.rejected.type ||
							action.type === authActions.loginThunk.rejected.type) {
							return
						}

						// todolistsActions.fetchTodolistsThunk ответа от сервера нет ошибки
						if (action.type === todolistsActions.fetchTodolistsThunk.rejected.type) {
							state.error = 'to fetch todolists attempt is failed'
							return
						}

						if (action.type === tasksActions.fetchTasksThunk.rejected.type) {
							state.error = 'to fetch tasks attempt is failed'
							return
						}

						// action.payload.error для fetchTasksThunk
						state.error = action.payload.messages[0] || action.payload.error || 'Server Error'
					} else {
						console.log('🔴 NETWORK => ', action)

						state.error = action.error.message ? action.error.message : 'Network Error'
					}
				}
			)
	}
})

/**
 * ⛔ SLICE   импортировать напрямую из файла => если черещ index, то будет ошибка
 * ⛔ ACTIONS импортировать напрямую из файла => если черещ index, то будет ошибка
 */
export const appSlice = slice.reducer
export const appActions = slice.actions


