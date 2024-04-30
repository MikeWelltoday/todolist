import React, { useEffect, useState } from 'react'
import './App.scss'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import { LoginPage, TodolistsPage } from 'pages'
import { ErrorSnackbar, HeaderAppBar } from 'widgets'
import { useAppDispatch } from 'shared'
import { authActions } from 'entities/authSlice/authSlice'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { appSelectors } from 'state/appSlice/appSlice'

//========================================================================================

type AppProps = {
	demo: boolean
}

type ThemeMode = 'dark' | 'light'

//========================================================================================

function App(props: AppProps) {

// логи стилизации
	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4'
			}
		}
	}) // общрая тема для всех компонетнов

	// отправляем cb-fnc в AppBar так как там будет кнопка переключения темы
	const changeModeHandler = () => {
		setThemeMode(themeMode === 'light' ? 'dark' : 'light')
	}

//========================================================================================
	const dispatch = useAppDispatch()
	const isInitialized = useSelector(appSelectors.selectInitialization)

	useEffect(() => {
		if (props.demo) return
		dispatch(authActions.initializationThunk())
	}, [])

	if (!isInitialized) {
		return (
			<div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
				<CircularProgress color={'success'} size={120} thickness={2} />
			</div>
		)
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<div className='App'>

				<ErrorSnackbar />

				<HeaderAppBar changeModeHandler={changeModeHandler} />

				<Container fixed>
					<Routes>
						<Route path={'/'} element={<TodolistsPage demo={props.demo} />} />
						<Route path={'/login'} element={<LoginPage />} />

						<Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>} />
						<Route path={'*'} element={<Navigate to={'/404'} />} />
					</Routes>
				</Container>

			</div>

		</ThemeProvider>
	)
}

export default App