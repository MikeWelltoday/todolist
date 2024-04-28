import React, { FC } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useSelector } from 'react-redux'
import { Loader } from './loader/Loader'
import { useAppDispatch, MenuButton } from 'shared'
import { authActions, authSelectors } from 'entities/authSlice/authSlice'
import Switch from '@mui/material/Switch'

//========================================================================================

type HeaderAppBarPropsType = {
	changeModeHandler: () => void
}

//========================================================================================

export const HeaderAppBar: FC<HeaderAppBarPropsType> = (props) => {

	const dispatch = useAppDispatch()
	const isLogged = useSelector(authSelectors.selectIsLogged)

	function logoutOnClickHandler() {
		dispatch(authActions.logoutThunk())
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static' sx={{ mb: '20px' }}>
				<Toolbar>

					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>

					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Todolist
					</Typography>

					{isLogged && <MenuButton onClick={logoutOnClickHandler}>LOGOUT</MenuButton>}

					<Switch color={'default'} onChange={props.changeModeHandler} />

				</Toolbar>

				<Loader />

			</AppBar>
		</Box>
	)
}