import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
			.addMatcher(
				(action) => {
					console.log('addMatcher matcher: ', action.type)
					return action.type.endsWith('/pending')
				},
				(state, action) => {
					console.log('🔵🔵🔵 DONE')
				}
			)
	}
})

export const appReducer = slice.reducer
export const appActions = slice.actions


