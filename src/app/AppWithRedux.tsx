import React, {useCallback} from 'react'
import './App.scss'
import {Todolist} from '../layout/todolist/Todolist'
import {AddItemForm} from '../components/addItemForm/AddItemForm'
import {HeaderAppBar} from '../layout/headerAppBar/HeaderAppBar'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import {addTodolistAC, todolistReducerType} from '../state/todolists-reducer/todolists-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../state/store'

//========================================================================================

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, todolistReducerType[]>(state => state.todolists)

    const addTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodolistAC(newTodolistTitle))
    }, [])

    return (
        <div className="App">

            <HeaderAppBar/>

            <Container fixed>

                <Grid container sx={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={5}>
                    {todolists.map(t => {
                            return (
                                <Grid item key={t.id}>
                                    <Paper sx={{padding: '10px'}} elevation={3}>
                                        <Todolist
                                            key={t.id}
                                            todolistId={t.id}
                                            title={t.title}
                                            filter={t.filter}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        }
                    )}
                </Grid>

            </Container>

        </div>
    )
}

export default AppWithRedux