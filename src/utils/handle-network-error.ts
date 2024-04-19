import { AppDispatchType } from 'app/store'
import { isAxiosError } from 'axios'
import { appActions } from 'state/reducers/app-reducer'


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
}

