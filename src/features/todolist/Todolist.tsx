import React, {FC, memo, useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import S from './Todolist.module.scss'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {Task} from '../task/Task'
import {AddItemForm, EditableSpan, FilterButton} from '../../components'
import {
    addTaskTC,
    AppRootStateType,
    changeTodolistFilterAC,
    fetchTasksTC,
    removeTaskTC,
    removeTodolistTC,
    RequestStatusType,
    TaskReducerType,
    TodolistFilterReducerType,
    updateTaskTC,
    updateTodolistTitleTC,
    useAppDispatch
} from '../../state'
import {TaskStatusesEnum} from '../../api'


//========================================================================================

type TodolistPropsType = {
    todolistId: string
    title: string
    filter: TodolistFilterReducerType
    entityStatus: RequestStatusType

    demo?: boolean
}

//========================================================================================

export const Todolist: FC<TodolistPropsType> = memo((props) => {

    console.log('🍄 TODOLIST')

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (props.demo) return
        dispatch(fetchTasksTC(props.todolistId))
    }, [])

    let tasks = useSelector<AppRootStateType, TaskReducerType[]>(state => state.tasks[props.todolistId])

    if (props.filter === 'active') {
        tasks = tasks.filter(item => !item.status)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(item => item.status)
    }

    const addTaskHandler = useCallback(((title: string) => {
        dispatch(addTaskTC(props.todolistId, title))
    }), [props.todolistId])

    const removeTodolistOnClickHandler = useCallback((() => {
        dispatch(removeTodolistTC(props.todolistId))
    }), [props.todolistId])

    const changeTodolistTitleOnChangeHandler = useCallback(((newTitle: string) => {
        dispatch(updateTodolistTitleTC(props.todolistId, newTitle))
    }), [props.todolistId])

    const changeTaskFilterAllOnClickHandler = useCallback((() => {
        dispatch(changeTodolistFilterAC(props.todolistId, 'all'))
    }), [props.todolistId])

    const changeTaskFilterActiveOnClickHandler = useCallback((() => {
        dispatch(changeTodolistFilterAC(props.todolistId, 'active'))
    }), [props.todolistId])

    const changeTaskFilterCompletedOnClickHandler = useCallback((() => {
        dispatch(changeTodolistFilterAC(props.todolistId, 'completed'))
    }), [props.todolistId])

    // task
    const removeTaskOnClickHandler = useCallback((taskId: string) => {
        dispatch(removeTaskTC(props.todolistId, taskId))
    }, [props.todolistId])

    const changeTaskStatusOnChangeHandler = useCallback((taskId: string, status: TaskStatusesEnum) => {
        dispatch(updateTaskTC(props.todolistId, taskId, {status}))
    }, [props.todolistId])

    const changeTaskTitleOnChangeHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(props.todolistId, taskId, {title: newTitle}))
    }, [props.todolistId])

    return (
        <div className={S.todolist}>

            <h3>
                <EditableSpan
                    title={props.title}
                    onChangeTitle={changeTodolistTitleOnChangeHandler}
                    entityStatus={props.entityStatus}
                />

                <IconButton onClick={removeTodolistOnClickHandler} disabled={props.entityStatus === 'loading'}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler} todolistEntityStatus={props.entityStatus}/>

            {tasks.length ?
                (<div className={S.tasksList}>
                    {tasks.map(t => {
                        return (
                            <Task
                                key={t.id}
                                taskId={t.id}
                                title={t.title}
                                status={t.status}
                                entityStatus={t.entityStatus}

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
                <FilterButton
                    title={'All'}
                    color={'inherit'}
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={changeTaskFilterAllOnClickHandler}
                />
                <FilterButton
                    title={'Active'}
                    color={'success'}
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={changeTaskFilterActiveOnClickHandler}
                />
                <FilterButton
                    title={'Completed'}
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={changeTaskFilterCompletedOnClickHandler}
                />
            </div>

        </div>
    )
})