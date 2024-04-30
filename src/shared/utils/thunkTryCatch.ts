import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { AppDispatch, AppRootState } from 'state/store/store'
import { handleNetworkError } from 'shared/utils/handleNetworkError'

//========================================================================================

export const thunkTryCatch = async <T>(
	thunkAPI: BaseThunkAPI<AppRootState, unknown, AppDispatch, null>,
	logic: () => Promise<T>): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
	const { dispatch, rejectWithValue } = thunkAPI
	// dispatch(appActions.setStatus({ status: 'loading' }))
	try {
		return await logic()
	} catch (error) {
		handleNetworkError(error, dispatch)
		return rejectWithValue(null)
	} finally {
		// dispatch(appActions.setStatus({ status: 'idle' }))
	}
}