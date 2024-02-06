import React, {useState} from 'react'
import './App.scss'
import {TasksType, Todolist} from './components/todoList/Todolist'
import {v1} from 'uuid'
import {AddItemForm} from './components/addItemForm/AddItemForm'
import {AppBar, Container, Grid, IconButton, Toolbar, Typography, Paper} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

//========================================================================================

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type tasksObjType = {
    [key: string]: TasksType[]
}

//========================================================================================

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<tasksObjType>({
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
        setTasks({
            ...tasks,
            [todolistId]: [{id: v1(), title: newTaskTitle, isDone: false}, ...tasks[todolistId]]
        })
    }

    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    function changeTaskFilter(todolistId: string, filterMode: FilterValuesType) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: filterMode} : t))
    }

    function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTaskTitle: string) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTaskTitle} : t)
        })
    }

    function changeTodolistTitle(todolistId: string, newTodolistTitle: string) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: newTodolistTitle} : t))
    }

    function addTodolist(newTodolistTitle: string) {
        const newTodolist: TodolistType = {id: v1(), title: newTodolistTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    function removeTodolist(todolistId: string) {
        setTodolists([...todolists.filter(item => item.id !== todolistId)])
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Menu
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {todolists.map(todolist => {
                            let filteredTasks = tasks[todolist.id]
                            if (todolist.filter === 'active') filteredTasks = filteredTasks.filter(item => !item.isDone)
                            if (todolist.filter === 'completed') filteredTasks = filteredTasks.filter(item => item.isDone)

                            return (
                                <Grid item>
                                    <Paper>
                                        <Todolist key={todolist.id}
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
                                                  removeTodolist={removeTodolist}/>
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