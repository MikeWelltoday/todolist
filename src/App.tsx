import React, {useState} from 'react'
import './App.css'
import {Todolist} from './components/todoList/Todolist'

// Types
import {TasksType} from './components/todoList/Todolist'
import {v1} from 'uuid'

//===============================================================================================================================================================

export type FilterValuesType = 'all' | 'active' | 'completed'

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
        // создадим новый массив, чтобы не изменять изначальный массив с сервера
        setTasks([{id: v1(), title: value, isDone: false}, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(item => !item.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(item => item.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    )
}

export default App
