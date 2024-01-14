import React, {ChangeEvent, useState} from 'react'
import classes from './TodoList.module.css'
import {FilterValuesType} from '../../App'

//===============================================================================================================================================================

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (value: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

//===============================================================================================================================================================

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    function onNewTitleChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.currentTarget.value)
    }

    function onNewTitleKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    function onAddTaskClickHandler() {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    function onAllClickHandler() {
        props.changeFilter('all')
    }

    function onActiveClickHandler() {
        props.changeFilter('active')
    }

    function onCompletedClickHandler() {
        props.changeFilter('completed')
    }

    return (
        <div className={classes.todolist}>

            <h3>{props.title}</h3>

            <div>
                <input type={'text'}
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyUp={onNewTitleKeyPressHandler}/>
                <button onClick={onAddTaskClickHandler}>+</button>
            </div>

            {
                props.tasks.length ?
                    <ul className={classes.list}>
                        {props.tasks.map(item => {
                            function onRemoveClickHandler() {
                                props.removeTask(item.id)
                            }

                            function onCheckboxChangeHandler(event: ChangeEvent<HTMLInputElement>) {
                                props.changeTaskStatus(item.id, event.currentTarget.checked)
                            }

                            return <li key={item.id}>
                                <input type="checkbox" checked={item.isDone} readOnly={true}
                                       onChange={onCheckboxChangeHandler}/>
                                <span>{item.title}</span>
                                <button onClick={onRemoveClickHandler}>X</button>
                            </li>
                        })
                        }
                    </ul>
                    : <div>NO TASKS</div>
            }


            <div className={classes.buttonContainer}>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>

        </div>
    )
}