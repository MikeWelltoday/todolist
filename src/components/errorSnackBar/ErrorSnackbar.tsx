import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { useSelector } from 'react-redux'
import { appActions, appErrorSelector, useAppDispatch } from 'state'
import Alert from '@mui/material/Alert'

//========================================================================================

export const ErrorSnackbar = () => {

	console.log('🍅 ERROR-SNACK-BAR')

	const dispatch = useAppDispatch()
	const error = useSelector(appErrorSelector)

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(appActions.setError({ error: null }))
	}

	return (
		<Snackbar
			open={error !== null}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Alert
				onClose={handleClose}
				severity='error'
				sx={{ width: '100%', backgroundColor: 'orangered' }}
				elevation={6}
				variant='filled'
			>{error} 😠</Alert>

		</Snackbar>
	)
}