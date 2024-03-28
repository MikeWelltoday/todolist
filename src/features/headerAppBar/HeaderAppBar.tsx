import React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Loader} from './loader/Loader'
import {useSelector} from 'react-redux'
import {authLogoutTC, isLoggedSelector, useAppDispatch} from '../../state'


//========================================================================================

export const HeaderAppBar = () => {

    console.log('🍭 APP-BAR')

    const dispatch = useAppDispatch()
    const isLogged = useSelector(isLoggedSelector)

    function logoutOnClickHandler() {
        dispatch(authLogoutTC())

    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color={'success'}>
                <Toolbar>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>

                    {isLogged && <Button color="inherit" onClick={logoutOnClickHandler}>LOGOUT</Button>}

                </Toolbar>

                <Loader/>

            </AppBar>
        </Box>
    )
}