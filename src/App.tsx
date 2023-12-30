import React from 'react'
import './App.css'
import {Todolist} from './components/Todolist'

// Types
import {TasksType} from './components/Todolist'

//===============================================================================================================================================================


function App() {


    let tasks: Array<TasksType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'TS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ]

    const removeTask = (id: number) => {
        tasks = tasks.filter(item => item.id !== id)
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask}/>
        </div>
    )
}

export default App
