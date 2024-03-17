import React from 'react'
import './App.scss'
import Container from '@mui/material/Container'
import {HeaderAppBar, TodolistsList} from '../features'
import {ErrorSnackbar} from '../components'

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
                <TodolistsList demo={props.demo}/>
            </Container>

        </div>
    )
}

export default App