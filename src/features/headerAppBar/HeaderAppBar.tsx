import React from 'react'
import {useSelector} from 'react-redux'
import {statusSelector} from '../../state'
import S from './HeaderAppBar.module.scss'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LinearProgress from '@mui/material/LinearProgress'

//========================================================================================

export const HeaderAppBar = () => {

    const status = useSelector(statusSelector)

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
                    <Button color="inherit">Login</Button>
                </Toolbar>

                <div className={S.loaderContainer}>
                    {status === 'loading' && <LinearProgress color={'success'}/>}
                </div>

            </AppBar>
        </Box>
    )
}