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
    todolistId: string
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
    const [error, setError] = useState<boolean>(false)

    function onChangeNewTitleHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.currentTarget.value)
    }

    function onKeyUpNewTitleHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        error && setError(false)
        if (e.key === 'Enter') onClickAddTaskHandler()
    }

    function onClickAddTaskHandler() {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle, props.todolistId)
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }

    function onClickFilterHandler(mode: FilterValuesType) {
        return () => props.changeFilter(mode, props.todolistId)
    }

    function onClickRemoveTodolistHandler() {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div className={S.todolist}>

            <h3>
                {props.title}
                <button onClick={onClickRemoveTodolistHandler}>✘</button>
            </h3>

            <div>
                <input className={`${error && S.error}`}
                       type={'text'}
                       value={newTaskTitle}
                       onChange={onChangeNewTitleHandler}
                       onKeyUp={onKeyUpNewTitleHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div className={S.errorMessage}>Field is required</div>}
            </div>

            {props.tasks.length ?
                (<ul className={S.tasksList}>
                    {props.tasks.map(item => {
                        function onClickRemoveTaskHandler() {
                            props.removeTask(item.id, props.todolistId)
                        }

                        function onChangeCheckboxHandler(event: ChangeEvent<HTMLInputElement>) {
                            props.changeTaskStatus(item.id, event.currentTarget.checked, props.todolistId)
                        }

                        return (
                            <li key={item.id} className={`${item.isDone && S.isDone}`}>
                                <input type="checkbox"
                                       checked={item.isDone}
                                       onChange={onChangeCheckboxHandler}/>
                                <span>{item.title}</span>
                                <button onClick={onClickRemoveTaskHandler}>X</button>
                            </li>
                        )
                    })}
                </ul>)
                : <div>NO TASKS</div>}

            <div className={S.buttonContainer}>
                <button className={`${props.filter === 'all' && S.activeFilter}`}
                        onClick={onClickFilterHandler('all')}>
                    All
                </button>
                <button className={`${props.filter === 'active' && S.activeFilter}`}
                        onClick={onClickFilterHandler('active')}>
                    Active
                </button>
                <button className={`${props.filter === 'completed' && S.activeFilter}`}
                        onClick={onClickFilterHandler('completed')}>
                    Completed
                </button>
            </div>

        </div>
    )
}



