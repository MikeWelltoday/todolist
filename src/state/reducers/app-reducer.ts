import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { todolistsThunks } from '../../features/todolistsList/model/todolist/todolists-reducer'

//========================================================================================

export type AppErrorType = string | null

export type StatusType = 'idle' | 'loading'

export type AppReducerType = {
	status: StatusType,
	error: AppErrorType
	isAppInitialized: boolean
}

//========================================================================================

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
			.addMatcher(isRejected, state => {
				state.status = 'idle'
			})
	}
})

export const appReducer = slice.reducer
export const appActions = slice.actions


