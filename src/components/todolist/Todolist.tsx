import React, {FC, memo, useCallback} from 'react'
import S from './Todolist.module.scss'
import {FilterValuesType, TodolistType} from '../../AppWithRedux'
import {AddItemForm} from '../addItemForm/AddItemForm'
import {EditableSpan} from '../editableSpan/EditableSpan'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../state/store'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/taasks-reducer/tasks-reducer'
import {Task} from '../task/Task'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from '../../state/todolists-reducer/todolists-reducer'

//========================================================================================

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolist: TodolistType
}

//========================================================================================

export const Todolist: FC<TodolistPropsType> = memo((props) => {

    console.log('todolist => R E N D E R')

    // todolist
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolist.id])
    const dispatch = useDispatch()

    if (props.todolist.filter === 'active') {
        tasks = tasks.filter(item => !item.isDone)
    }
    if (props.todolist.filter === 'completed') {
        tasks = tasks.filter(item => item.isDone)
    }

    const addTaskHandler = useCallback(((title: string) => {
        dispatch(addTaskAC(props.todolist.id, title))
    }), [props.todolist.id])

    const changeTaskFilterOnClickHandler = useCallback(((mode: FilterValuesType) => {
        return () => dispatch(changeTodolistFilterAC(props.todolist.id, mode))
    }), [props.todolist.id])

    const removeTodolistOnClickHandler = useCallback((() => {
        dispatch(removeTodolistAC(props.todolist.id))
    }), [props.todolist.id])

    const changeTodolistTitleOnChangeHandler = useCallback(((newTitle: string) => {
        dispatch(changeTodolistTitleAC(props.todolist.id, newTitle))
    }), [props.todolist.id])

    // task
    const removeTaskOnClickHandler = useCallback((taskId: string) => {
        dispatch(removeTaskAC(props.todolist.id, taskId))
    }, [props.todolist.id])

    const changeTaskStatusOnChangeHandler = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(props.todolist.id, taskId, isDone))
    }, [props.todolist.id])

    const changeTaskTitleOnChangeHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(props.todolist.id, taskId, newTitle))
    }, [props.todolist.id])


    return (
        <div className={S.todolist}>

            <h3>
                <EditableSpan onChangeTitle={changeTodolistTitleOnChangeHandler}>{props.todolist.title}</EditableSpan>
                <IconButton onClick={removeTodolistOnClickHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>

            {tasks.length ?
                (<div className={S.tasksList}>
                    {tasks.map(t => {
                        return (
                            <Task
                                key={t.id}
                                taskId={t.id}
                                title={t.title}
                                isDone={t.isDone}

                                removeTaskOnClickHandler={removeTaskOnClickHandler}
                                changeTaskStatusOnChangeHandler={changeTaskStatusOnChangeHandler}
                                changeTaskTitleOnChangeHandler={changeTaskTitleOnChangeHandler}
                            />
                        )
                    })}
                </div>)
                :
                <div>NO TASKS</div>}

            <div className={S.buttonContainer}>
                <Button
                    color={'inherit'}
                    variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={changeTaskFilterOnClickHandler('all')}
                >
                    All
                </Button>
                <Button
                    color={'success'}
                    variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={changeTaskFilterOnClickHandler('active')}
                >
                    Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={changeTaskFilterOnClickHandler('completed')}
                >
                    Completed
                </Button>
            </div>

        </div>
    )
})