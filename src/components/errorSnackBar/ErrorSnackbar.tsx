import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/store'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { appErrorSelector } from 'state/selectors/appError-selector'
import { appActions } from 'state/reducers/app-reducer'

//========================================================================================

export const ErrorSnackbar = () => {

	console.log('🍅 ERROR-SNACK-BAR')

	const dispatch = useAppDispatch()
	const error = useSelector(appErrorSelector)

	// добавил локальное состояния, по которому будет отрисовываться компонент
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (error) {
			setOpen(true)
		}
	}, [error])


	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	const handleExited = () => {
		dispatch(appActions.setError({ error: null }))
	}

	return (
		<Snackbar
			open={open}
			// autoHideDuration устанавливает время срабатывания onClose
			autoHideDuration={6000}
			onClose={handleClose}
			TransitionProps={{ onExited: handleExited }}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Alert
				onClose={handleClose}
				severity='error'
				sx={{ width: '100%', backgroundColor: 'orangered' }}
				elevation={6}
				variant='filled'
			>
				{error}
			</Alert>

		</Snackbar>
	)
}