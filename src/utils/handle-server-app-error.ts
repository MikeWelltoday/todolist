import { AppDispatchType } from 'app/store'
import { appActions } from 'state'


export const handleServerAppError = (resMessagesArr: string[], dispatch: AppDispatchType) => {
	dispatch(appActions.setError({ error: resMessagesArr.length ? resMessagesArr[0] : 'Some error occurred' }))
	dispatch(appActions.setStatus({ status: 'idle' }))
}