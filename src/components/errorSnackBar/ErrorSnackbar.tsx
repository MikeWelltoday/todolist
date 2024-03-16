import React, {useState} from 'react'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

//========================================================================================

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {

    const [open, setOpen] = useState(true)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={handleClose} severity="error" sx={{width: '100%', backgroundColor: 'orangered'}}>
                Error message 😠
            </Alert>
        </Snackbar>
    )
}