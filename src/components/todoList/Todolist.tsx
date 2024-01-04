import React from 'react'
import {FilterValuesType} from '../../App'
import classes from './TodoList.module.css'

//===============================================================================================================================================================


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: () => void
}

//===============================================================================================================================================================

export const Todolist: React.FC<TodolistType> = (props) => {
    return (
        <div className={classes.todolist}>
            <h3>{props.title}</h3>
            <div>
                <input type={'text'}/>
                <button onClick={() => props.addTask()}>+</button>
            </div>
            <ul className={classes.list}>
                {props.tasks.map(item =>
                    <li key={item.id}>
                        <input type="checkbox" checked={item.isDone} readOnly={true}/>
                        <span>{item.title}</span>
                        <button onClick={() => props.removeTask(item.id)}>X</button>
                    </li>
                )}
            </ul>
            <div className={classes.buttonContainer}>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}