import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//========================================================================================

export type AppErrorType = string | null

export type AppReducerType = {
	status: boolean,
	error: AppErrorType
	isAppInitialized: boolean
}

//========================================================================================

const initialState: AppReducerType = {
	status: false,
	error: null,
	isAppInitialized: false
}

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {

		setStatus: (state, action: PayloadAction<{ status: boolean }>) => {
			state.status = action.payload.status
		},

		setError: (state, action: PayloadAction<{ error: AppErrorType }>) => {
			state.error = action.payload.error
		},

		setAppIsInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
			state.isAppInitialized = action.payload.isAppInitialized
		}

	}
})

export const appReducer = slice.reducer
export const appActions = slice.actions


