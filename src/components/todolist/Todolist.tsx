import React, {ChangeEvent} from 'react'
import S from './Todolist.module.scss'
import {FilterValuesType} from '../../App'
import {AddItemForm} from '../addItemForm/AddItemForm'
import {EditableSpan} from '../editableSpan/EditableSpan'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete'

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

    function changeTaskFilterOnClickHandler(mode: FilterValuesType) {
        return () => props.changeTaskFilter(props.todolistId, mode)
    }

    function addTaskHandler(title: string) {
        props.addTask(props.todolistId, title)
    }

    function removeTodolistOnClickHandler() {
        props.removeTodolist(props.todolistId)
    }

    function changeTodolistTitleOnChangeHandler(newTitle: string) {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    return (
        <div className={S.todolist}>

            <h3>
                <EditableSpan onChangeTitle={changeTodolistTitleOnChangeHandler}>{props.todolistTitle}</EditableSpan>
                <IconButton onClick={removeTodolistOnClickHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>

            {props.filteredTasks.length ?
                (<div className={S.tasksList}>
                    {props.filteredTasks.map(item => {

                        function removeTaskOnClickHandler() {
                            props.removeTask(props.todolistId, item.id)
                        }

                        function changeTaskStatusOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
                            props.changeTaskStatus(props.todolistId, item.id, event.currentTarget.checked)
                        }

                        function changeTaskTitleOnChangeHandler(newTitle: string) {
                            props.changeTaskTitle(props.todolistId, item.id, newTitle)
                        }

                        return (
                            <div key={item.id} className={`${item.isDone && S.isDone}`}>
                                <Checkbox
                                    checked={item.isDone}
                                    onChange={changeTaskStatusOnChangeHandler}
                                    color="secondary"
                                />
                                <EditableSpan onChangeTitle={changeTaskTitleOnChangeHandler}>{item.title}</EditableSpan>
                                <IconButton onClick={removeTaskOnClickHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        )
                    })}
                </div>)
                : <div>NO TASKS</div>}

            <div className={S.buttonContainer}>
                <Button
                    color={'inherit'}
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={changeTaskFilterOnClickHandler('all')}
                >
                    All
                </Button>
                <Button
                    color={'success'}
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={changeTaskFilterOnClickHandler('active')}
                >
                    Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={changeTaskFilterOnClickHandler('completed')}
                >
                    Completed
                </Button>
            </div>

        </div>
    )
}



