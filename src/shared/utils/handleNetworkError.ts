import { AppDispatch } from 'state/store/store'
import { isAxiosError } from 'axios'
import { appActions } from 'state/appSlice/appSlice'

//========================================================================================

export function handleNetworkError(error: unknown, dispatch: AppDispatch): void {
	let errorMessage = 'Some error occurred'
	if (isAxiosError(error)) {
		errorMessage = error.response?.data?.message || error?.message || errorMessage
	} else if (error instanceof Error) {
		errorMessage = `Native error: ${error.message}`
	} else {
		errorMessage = JSON.stringify(error)
	}
	dispatch(appActions.setErrorAction({ error: errorMessage }))
}

