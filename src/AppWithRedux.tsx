import React, {useCallback} from 'react'
import './App.scss'
import {TaskType, Todolist} from './components/todolist/Todolist'
import {AddItemForm} from './components/addItemForm/AddItemForm'
import {HeaderAppBar} from './components/headerAppBar/HeaderAppBar'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todolists-reducer/todolists-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'

//========================================================================================
// 🎲 .T.Y.P.E.S.

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: TaskType[]
}

//========================================================================================
// 🧁 .C.O.P.O.N.E.N.T.

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const changeTaskFilter = useCallback((todolistId: string, filterMode: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filterMode))
    }, [dispatch])

    const changeTodolistTitle = useCallback(((todolistId: string, newTodolistTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTodolistTitle))
    }), [dispatch])

    const addTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodolistAC(newTodolistTitle))
    }, [dispatch])

    const removeTodolist = useCallback(((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }), [dispatch])


    return (
        <div className="App">

            <HeaderAppBar/>

            <Container fixed>

                <Grid container sx={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={5}>
                    {todolists.map(todolist => {
                            return (
                                <Grid item key={todolist.id}>
                                    <Paper sx={{padding: '10px'}} elevation={3}>
                                        <Todolist
                                            key={todolist.id}
                                            todolistId={todolist.id}
                                            todolistTitle={todolist.title}
                                            filter={todolist.filter}
                                            changeTaskFilter={changeTaskFilter}
                                            changeTodolistTitle={changeTodolistTitle}
                                            removeTodolist={removeTodolist}
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