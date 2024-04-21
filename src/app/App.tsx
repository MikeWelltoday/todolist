import React, { useEffect } from 'react'
import './App.scss'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import { LoginPage, TodolistsPage } from '../pages'
import { ErrorSnackbar, HeaderAppBar } from '../widgets'
import { useAppDispatch } from '../shared'
import { authActions } from '../entities/authSlice/authSlice'
import { appInitializationSelector } from '../state'


type AppPropsType = {
	demo: boolean
}

function App(props: AppPropsType) {

	const dispatch = useAppDispatch()
	const isInitialized = useSelector(appInitializationSelector)

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
		<div className='App'>

			<ErrorSnackbar />

			<HeaderAppBar />

			<Container fixed>
				<Routes>
					<Route path={'/'} element={<TodolistsPage demo={props.demo} />} />
					<Route path={'/login'} element={<LoginPage />} />

					<Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>} />
					<Route path={'*'} element={<Navigate to={'/404'} />} />
				</Routes>
			</Container>

		</div>
	)
}

export default App