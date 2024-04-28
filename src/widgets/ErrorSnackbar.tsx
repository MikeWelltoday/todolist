import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAppDispatch } from 'shared'
import { appActions, appSelectors } from 'state/appSlice/appSlice'

//========================================================================================

export const ErrorSnackbar = () => {

	const dispatch = useAppDispatch()
	const error = useSelector(appSelectors.selectError)

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
		dispatch(appActions.setErrorAction({ error: null }))
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