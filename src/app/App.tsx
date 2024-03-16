import React from 'react'
import './App.scss'
import {HeaderAppBar} from '../features/headerAppBar/HeaderAppBar'
import Container from '@mui/material/Container'
import {TodolistsList} from '../features/todolistsList/TodolistsList'

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