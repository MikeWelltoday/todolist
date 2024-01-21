import React, {ChangeEvent, useState} from 'react'
import S from './Todolist.module.scss'
import {FilterValuesType} from '../../App'

//===============================================================================================================================================================

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    filter: FilterValuesType
    addTask: (value: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
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
            onAddTaskClickHandler()
        }
    }

    function onAddTaskClickHandler() {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }

    function onClickFilterHandler(mode: FilterValuesType) {
        return () => props.changeFilter(mode, props.id)
    }

    function onClickRemoveTodolistHandler() {
        props.removeTodolist(props.id)
    }


    return (
        <div className={S.todolist}>

            <h3>
                {props.title}
                <button onClick={onClickRemoveTodolistHandler}>✘</button>
            </h3>

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
                    <ul className={S.list}>
                        {props.tasks.map(item => {
                            function onRemoveClickHandler() {
                                props.removeTask(item.id, props.id)
                            }

                            function onCheckboxChangeHandler(event: ChangeEvent<HTMLInputElement>) {
                                props.changeTaskStatus(item.id, event.currentTarget.checked, props.id)
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


            <div className={S.buttonContainer}>
                <button onClick={onClickFilterHandler('all')}
                        className={props.filter === 'all' ? 'active-filter' : ''}
                >
                    All
                </button>
                <button onClick={onClickFilterHandler('active')}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                >
                    Active
                </button>
                <button onClick={onClickFilterHandler('completed')}
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                >
                    Completed
                </button>
            </div>

        </div>
    )
}