import { AppDispatchType } from 'app/store'
import { appActions } from 'state/reducers/app-reducer'

/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при взаимодействии с сервером.
 * @param resMessagesArr  - ответ от сервера в формате string[]
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param showError - флаг, указывающий, нужно ли отображать ошибки в пользовательском интерфейсе
 */

export const handleServerError = (resMessagesArr: string[], dispatch: AppDispatchType, showError: boolean = true) => {
	if (showError) {
		dispatch(appActions.setError({ error: resMessagesArr.length ? resMessagesArr[0] : 'Some error occurred' }))
	}
	dispatch(appActions.setStatus({ status: 'idle' }))
}