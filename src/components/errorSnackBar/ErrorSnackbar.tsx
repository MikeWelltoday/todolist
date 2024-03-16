import React, {MouseEventHandler, useState} from 'react'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {useSelector} from 'react-redux'
import {appSetErrorAC, errorSelector, useAppDispatch} from '../../state'

//========================================================================================

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {

    const dispatch = useAppDispatch()
    const error = useSelector(errorSelector)

    // костыль, чтобы когда сетался null в error
    // надпись не исчезала раньше snackbar
    const [message] = useState(error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            dispatch(appSetErrorAC(null))
            return
        }
    }

    setTimeout(() => {
        dispatch(appSetErrorAC(null))
    }, 4000)

    function closeOnClickHandler() {
        dispatch(appSetErrorAC(null))
    }

    return (
        <Snackbar
            open={error !== null}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert
                onClose={handleClose}
                severity="error"
                sx={{width: '100%', backgroundColor: 'orangered'}}
                onClick={closeOnClickHandler}
            >
                {message} 😠
            </Alert>
        </Snackbar>
    )
}