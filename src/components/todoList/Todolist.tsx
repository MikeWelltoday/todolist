import React, {ChangeEvent} from 'react'
import S from './Todolist.module.scss'
import {FilterValuesType} from '../../App'
import {AddItemForm} from '../addItemForm/AddItemForm'
import {EditableSpan} from '../editableSpan/EditableSpan'

//========================================================================================

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    filteredTasks: Array<TasksType>
    filter: FilterValuesType
    addTask: (todolistId: string, newTaskTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskFilter: (todolistId: string, filterMode: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTaskTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTodolistTitle: string) => void
    removeTodolist: (todolistId: string) => void
}

//========================================================================================

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    function onClickChangeTaskFilterHandler(mode: FilterValuesType) {
        return () => props.changeTaskFilter(props.todolistId, mode)
    }

    function addTaskHandler(title: string) {
        props.addTask(props.todolistId, title)
    }

    function onClickRemoveTodolistHandler() {
        props.removeTodolist(props.todolistId)
    }

    function onChangeChangeTodolistTitleHandler(newTitle: string) {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    return (
        <div className={S.todolist}>

            <h3>
                <EditableSpan onChangeTitle={onChangeChangeTodolistTitleHandler}>{props.todolistTitle}</EditableSpan>
                <button onClick={onClickRemoveTodolistHandler}>✘</button>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>

            {props.filteredTasks.length ?
                (<ul className={S.tasksList}>
                    {props.filteredTasks.map(item => {

                        function onClickRemoveTaskHandler() {
                            props.removeTask(props.todolistId, item.id)
                        }

                        function onChangeChangeTaskStatusHandler(event: ChangeEvent<HTMLInputElement>) {
                            props.changeTaskStatus(props.todolistId, item.id, event.currentTarget.checked)
                        }

                        function onChangeChangeTaskTitleHandler(newTitle: string) {
                            props.changeTaskTitle(props.todolistId, item.id, newTitle)
                        }

                        return (
                            <li key={item.id} className={`${item.isDone && S.isDone}`}>
                                <input type="checkbox"
                                       checked={item.isDone}
                                       onChange={onChangeChangeTaskStatusHandler}/>
                                <EditableSpan onChangeTitle={onChangeChangeTaskTitleHandler}>{item.title}</EditableSpan>
                                <button onClick={onClickRemoveTaskHandler}>X</button>
                            </li>
                        )
                    })}
                </ul>)
                : <div>NO TASKS</div>}

            <div className={S.buttonContainer}>
                <button className={`${props.filter === 'all' && S.activeFilter}`}
                        onClick={onClickChangeTaskFilterHandler('all')}>
                    All
                </button>
                <button className={`${props.filter === 'active' && S.activeFilter}`}
                        onClick={onClickChangeTaskFilterHandler('active')}>
                    Active
                </button>
                <button className={`${props.filter === 'completed' && S.activeFilter}`}
                        onClick={onClickChangeTaskFilterHandler('completed')}>
                    Completed
                </button>
            </div>

        </div>
    )
}



