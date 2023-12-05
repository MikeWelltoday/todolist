import React from 'react'
import './App.css'
import {Todolist} from './components/Todolist'

// Types
import TasksType from './components/Todolist'

function App() {

    let task1: Array<TasksType> = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'TS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]

    let task2: Array<TasksType> = [
        {id: 1, title: 'Terminator', isDone: true},
        {id: 2, title: 'XXX', isDone: false},
        {id: 3, title: 'Gentleman of Fortune', isDone: true}
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={task1}/>
            <Todolist title="Movies" tasks={task2}/>
        </div>
    )
}

export default App

