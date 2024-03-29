import React, {useEffect} from 'react'
import './App.scss'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import {HeaderAppBar, Login, TodolistsList} from '../features'
import {ErrorSnackbar} from '../components'
import {Route, Routes, Navigate} from 'react-router-dom'
import {authIsInitializedTC, isInitializedSelector, useAppDispatch} from '../state'
import {useSelector} from 'react-redux'

//========================================================================================

type AppPropsType = {
    demo: boolean
}

//========================================================================================

function App(props: AppPropsType) {

    const dispatch = useAppDispatch()
    const isInitialized = useSelector(isInitializedSelector)

    useEffect(() => {
        if (props.demo) return
        dispatch(authIsInitializedTC())
    }, [])

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress color={'success'} size={120} thickness={2}/>
            </div>
        )
    }

    return (
        <div className="App">

            <ErrorSnackbar/>

            <HeaderAppBar/>

            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={props.demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>

                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>

        </div>
    )
}

export default App