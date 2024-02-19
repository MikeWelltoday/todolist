import React from 'react'
import './App.scss'
import {TasksType, Todolist} from './components/todolist/Todolist'
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
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/taasks-reducer/tasks-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'

//========================================================================================

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type tasksType = {
    [key: string]: TasksType[]
}

//========================================================================================

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, tasksType>(state => state.tasks)

    function addTask(todolistId: string, newTaskTitle: string) {
        dispatch(addTaskAC(todolistId, newTaskTitle))
    }

    function removeTask(todolistId: string, taskId: string) {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTaskTitle: string) {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTaskTitle))
    }

    function changeTaskFilter(todolistId: string, filterMode: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistId, filterMode))
    }

    function changeTodolistTitle(todolistId: string, newTodolistTitle: string) {
        dispatch(changeTodolistTitleAC(todolistId, newTodolistTitle))
    }

    function addTodolist(newTodolistTitle: string) {
        dispatch(addTodolistAC(newTodolistTitle))
    }

    function removeTodolist(todolistId: string) {
        dispatch(removeTodolistAC(todolistId))
    }

    return (
        <div className="App">

            <HeaderAppBar/>

            <Container fixed>

                <Grid container sx={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={5}>
                    {todolists.map(todolist => {
                            let filteredTasks = tasks[todolist.id]
                            if (todolist.filter === 'active') {
                                filteredTasks = filteredTasks.filter(item => !item.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = filteredTasks.filter(item => item.isDone)
                            }

                            return (
                                <Grid item>
                                    <Paper sx={{padding: '10px'}} elevation={3}>
                                        <Todolist
                                            key={todolist.id}
                                            todolistId={todolist.id}
                                            todolistTitle={todolist.title}
                                            filteredTasks={filteredTasks}
                                            filter={todolist.filter}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeTaskFilter={changeTaskFilter}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
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