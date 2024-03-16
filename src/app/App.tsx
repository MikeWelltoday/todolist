import React from 'react'
import './App.scss'
import Container from '@mui/material/Container'
import {HeaderAppBar, TodolistsList} from '../features'
import {ErrorSnackbar} from '../components'

//========================================================================================

function App() {
    return (
        <div className="App">

            <ErrorSnackbar/>

            <HeaderAppBar/>

            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    )
}

export default App