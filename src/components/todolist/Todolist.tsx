import React, {ChangeEvent} from 'react'
import S from './Todolist.module.scss'
import {FilterValuesType} from '../../AppWithRedux'
import {AddItemForm} from '../addItemForm/AddItemForm'
import {EditableSpan} from '../editableSpan/EditableSpan'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../state/store'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/taasks-reducer/tasks-reducer'

//========================================================================================
// 🎲 .T.Y.P.E.S.

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    filter: FilterValuesType
    changeTaskFilter: (todolistId: string, filterMode: FilterValuesType) => void
    changeTodolistTitle: (todolistId: string, newTodolistTitle: string) => void
    removeTodolist: (todolistId: string) => void
}

//========================================================================================
// 🧁 .C.O.P.O.N.E.N.T.

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    if (props.filter === 'active') {
        tasks = tasks.filter(item => !item.isDone)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(item => item.isDone)
    }

    function addTaskHandler(title: string) {
        dispatch(addTaskAC(props.todolistId, title))
    }

    function changeTaskFilterOnClickHandler(mode: FilterValuesType) {
        return () => props.changeTaskFilter(props.todolistId, mode)
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

            {tasks.length ?
                (<div className={S.tasksList}>
                    {tasks.map(item => {

                        function removeTaskOnClickHandler() {
                            dispatch(removeTaskAC(props.todolistId, item.id))
                        }

                        function changeTaskStatusOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
                            dispatch(changeTaskStatusAC(props.todolistId, item.id, event.currentTarget.checked))
                        }

                        function changeTaskTitleOnChangeHandler(newTitle: string) {
                            dispatch(changeTaskTitleAC(props.todolistId, item.id, newTitle))
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



