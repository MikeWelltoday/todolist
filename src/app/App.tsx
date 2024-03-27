import React from 'react'
import './App.scss'
import Container from '@mui/material/Container'
import {HeaderAppBar, Login, TodolistsList} from '../features'
import {ErrorSnackbar} from '../components'
import {Route, Routes, Navigate} from 'react-router-dom'

//========================================================================================

type AppPropsType = {
    demo: boolean
}

//========================================================================================

function App(props: AppPropsType) {
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