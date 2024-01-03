import React, {useState} from 'react'
import './App.css'
import {Todolist} from './components/todoList/Todolist'

// Types
import {TasksType} from './components/todoList/Todolist'

//===============================================================================================================================================================

//типизация
// ### [2] фильтрация элементов массива
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    //### [1] удаление элементов массива
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'TS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])

    const removeTask = (id: number) => {
        setTasks(value => value.filter(item => item.id !== id))
    }

    //### [2] фильтрация элементов массива
    const [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist = tasks

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(item => item.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(item => !item.isDone)
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasksForTodolist} removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    )
}

export default App
