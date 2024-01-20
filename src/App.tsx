import React, {useState} from 'react'
import './App.scss'
import {Todolist} from './components/todoList/Todolist'
import {v1} from 'uuid'
import {TasksType} from './components/todoList/Todolist'

//===============================================================================================================================================================

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

//===============================================================================================================================================================

function App() {

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'TS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    function removeTask(id: string) {
        setTasks(tasks.filter(item => item.id !== id))
    }

    function addTask(value: string) {
        setTasks([{id: v1(), title: value, isDone: false}, ...tasks])
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(item => item.id === todolistId)
        // if todolist is found
        if (todolist) {
            todolist.filter = value
            // tell React that we change todolists-data
            setTodolists([...todolists])
        }
    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(item => item.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    //data for Todolist
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to buy', filter: 'completed'}
    ])


    return (
        <div className="App">

            {todolists.map(todolist => {

                    // filtration
                    let tasksForTodolist = tasks
                    if (todolist.filter === 'active') {
                        tasksForTodolist = tasks.filter(item => !item.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        tasksForTodolist = tasks.filter(item => item.isDone)
                    }

                    return (
                        <Todolist
                            id={todolist.id}
                            key={todolist.id}
                            title={todolist.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={todolist.filter}
                        />
                    )
                }
            )}
        </div>
    )
}

export default App