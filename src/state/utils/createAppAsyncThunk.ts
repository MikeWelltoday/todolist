import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, AppRootState } from 'state/store/store'

//========================================================================================

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootState,
	dispatch: AppDispatch,
	rejectValue: null
}>()
