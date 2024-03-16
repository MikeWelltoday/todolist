import React from 'react'
import './App.scss'
import Container from '@mui/material/Container'
import {HeaderAppBar, TodolistsList} from '../features'

//========================================================================================

function App() {
    return (
        <div className="App">

            <HeaderAppBar/>

            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    )
}

export default App