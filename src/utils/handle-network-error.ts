import { AppDispatchType } from 'app/store'
import { appActions } from 'state'
import { isAxiosError } from 'axios'


export function handleNetworkError(error: unknown, dispatch: AppDispatchType): void {
	let errorMessage = 'Some error occurred'
	if (isAxiosError(error)) {
		errorMessage = error.response?.data?.message || error?.message || errorMessage
	} else if (error instanceof Error) {
		errorMessage = `Native error: ${error.message}`
	} else {
		errorMessage = JSON.stringify(error)
	}
	dispatch(appActions.setError({ error: errorMessage }))
	dispatch(appActions.setStatus({ status: 'idle' }))
}
