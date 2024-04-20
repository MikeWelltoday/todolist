import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatchType, AppRootStateType } from 'state/store/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootStateType,
	dispatch: AppDispatchType,
	rejectValue: null
}>()
