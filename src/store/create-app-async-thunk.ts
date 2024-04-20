import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatchType, AppRootStateType } from 'store/store'


export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootStateType,
	dispatch: AppDispatchType,
	rejectValue: null
}>()
