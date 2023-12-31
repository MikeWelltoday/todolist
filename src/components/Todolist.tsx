import React from 'react'
import {FilterValuesType} from '../App'

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}


export const Todolist = (props: TodolistType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type={'text'}/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(item =>
                    <li>
                        <input type="checkbox" checked={item.isDone} readOnly={true}/>
                        <span>{item.title}</span>
                        <button onClick={() => props.removeTask(item.id)}>X</button>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}