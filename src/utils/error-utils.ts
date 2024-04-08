import { AppDispatchType } from 'app/store'
import { appActions } from 'state'
import { isAxiosError } from 'axios'

//========================================================================================

export const handleServerAppError = (resMessagesArr: string[], dispatch: AppDispatchType) => {
	dispatch(appActions.setError({ error: resMessagesArr.length ? resMessagesArr[0] : 'Some error occurred' }))
	dispatch(appActions.setStatus({ status: false }))
}

export function handleServerNetworkError(error: unknown, dispatch: AppDispatchType): void {
	let errorMessage = 'Some error occurred'
	if (isAxiosError(error)) {
		errorMessage = error.response?.data?.message || error?.message || errorMessage
	} else if (error instanceof Error) {
		errorMessage = `Native error: ${error.message}`
	} else {
		errorMessage = JSON.stringify(error)
	}
	dispatch(appActions.setError({ error: errorMessage }))
	dispatch(appActions.setStatus({ status: false }))
}

