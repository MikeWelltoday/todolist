import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { tasksThunks } from '../../features/tasks/model/tasksSlice'
import { todolistsThunks } from '../../features/todolist/model/todolistsSlice'
import { authThunks } from '../../entities/authSlice/authSlice'


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

const slice = createSlice({
	name: 'appReducer',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<{ status: StatusType }>) => {
			state.status = action.payload.status
		},
		setError: (state, action: PayloadAction<{ error: AppErrorType }>) => {
			state.error = action.payload.error
		},
		setAppIsInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
			state.isAppInitialized = action.payload.isAppInitialized
		}
	},
	extraReducers: builder => {
		builder
			.addMatcher(isPending, state => {
				state.status = 'loading'
			})
			.addMatcher(isFulfilled, state => {
				state.status = 'idle'
			})

			.addMatcher(isRejected, (state, action: any) => {
					state.status = 'idle'
					if (action.payload && action.payload.messages) {
						console.log('🟡 SERVER => ', action)
						if (action.type === todolistsThunks.addTodolistTC.rejected.type ||
							action.type === tasksThunks.addTaskTC.rejected.type ||
							action.type === authThunks.authIsInitializedTC.rejected.type ||
							action.type === authThunks.authSetLoggedTC.rejected.type) {
							return
						}
						state.error = action.payload.messages[0] || 'Server Error'

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


