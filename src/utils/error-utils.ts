import { AppDispatchType } from 'app/store'
import { appActions } from 'state'

//========================================================================================

export const handleServerAppError = (resMessagesArr: string[], dispatch: AppDispatchType) => {
	dispatch(appActions.setError({ error: resMessagesArr.length ? resMessagesArr[0] : 'Some error occurred' }))
	console.error(resMessagesArr.length ? resMessagesArr[0] : 'Some error occurred')
}

export function handleServerNetworkError(error: any, dispatch: AppDispatchType) {

	if (typeof error === 'string') {
		dispatch(appActions.setError({ error }))
		console.error(error)
	} else if (error instanceof Error) {
		dispatch(appActions.setError({ error: error.message }))
		console.error(error.message)
	}
}



