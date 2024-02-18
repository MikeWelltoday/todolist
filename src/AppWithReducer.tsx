import React, {useReducer, useState} from 'react'
import './App.scss'
import {v1} from 'uuid'
import {TasksType, Todolist} from './components/todolist/Todolist'
import {AddItemForm} from './components/addItemForm/AddItemForm'
import {HeaderAppBar} from './components/headerAppBar/HeaderAppBar'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer/todolists-reducer'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './state/taasks-reducer/tasks-reducer'

//========================================================================================

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type tasksObjType = {
    [key: string]: TasksType[]
}

//========================================================================================

function AppWithReducer() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]:
            [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'TS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},
                {id: v1(), title: 'Redux', isDone: false}
            ],
        [todolistId2]:
            [
                {id: v1(), title: 'Book', isDone: false},
                {id: v1(), title: 'Milk', isDone: true}
            ]
    })

    function addTask(todolistId: string, newTaskTitle: string) {
        dispatchToTasksReducer(addTaskAC(todolistId, newTaskTitle))
    }

    function removeTask(todolistId: string, taskId: string) {
        dispatchToTasksReducer(removeTaskAC(todolistId, taskId))
    }

    function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatchToTasksReducer(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTaskTitle: string) {
        dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskId, newTaskTitle))
    }

    function changeTaskFilter(todolistId: string, filterMode: FilterValuesType) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, filterMode))
    }

    function changeTodolistTitle(todolistId: string, newTodolistTitle: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newTodolistTitle))
    }

    function addTodolist(newTodolistTitle: string) {
        const action = addTodolistAC(newTodolistTitle)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
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

export default AppWithReducer