import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { AppDispatchType, AppRootStateType } from 'store/store'
import { handleNetworkError } from 'shared/utils/handleNetworkError'

// AuthLoginResponseType для санки authSetLoggedTC

export const thunkTryCatch = async <T>(
	thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatchType, null>,
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