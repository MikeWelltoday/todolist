import React, {useCallback, useEffect} from 'react'
import './App.scss'
import {Todolist} from '../components/todolist/Todolist'
import {AddItemForm} from '../components/UI/addItemForm/AddItemForm'
import {HeaderAppBar} from '../components/headerAppBar/HeaderAppBar'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import {
    addTodolistAC,
    fetchTodolistsTC,
    todolistReducerType
} from '../state/todolists-reducer/todolists-reducer'
import {useSelector} from 'react-redux'
import {AppRootStateType, useAppDispatch} from '../state/store'

//========================================================================================

function App() {

    const dispatch = useAppDispatch()

    const todolists = useSelector<AppRootStateType, todolistReducerType[]>(state => state.todolists)

    const addTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodolistAC(newTodolistTitle))
    }, [])

    debugger

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    debugger

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

export default App