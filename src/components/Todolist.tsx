import React from 'react'

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: Array<TasksType>
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
                        <input type="checkbox" checked={item.isDone}/>
                        <span>{item.title}</span>
                    </li>
                )}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}