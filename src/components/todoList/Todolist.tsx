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
    filter: FilterValuesType
}

//===============================================================================================================================================================

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    function onNewTitleChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.currentTarget.value)
    }

    function onNewTitleKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (e.key === 'Enter') {
            if (newTaskTitle.trim() !== '') {
                props.addTask(newTaskTitle)
                setNewTaskTitle('')
            } else {
                setError('Field is required')
            }
        }
    }

    function onAddTaskClickHandler() {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
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
                       onKeyUp={onNewTitleKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={onAddTaskClickHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
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

                            return <li key={item.id} className={item.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={item.isDone}
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
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? 'active-filter' : ''}
                >
                    All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                >
                    Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                >
                    Completed
                </button>
            </div>

        </div>
    )
}