import React, {ChangeEvent, FC, memo, useCallback} from 'react'
import S from './Task.module.scss'
import {EditableSpan} from '../../components/editableSpan/EditableSpan'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

//========================================================================================

type TaskPropsType = {
    taskId: string
    title: string
    isDone: boolean

    removeTaskOnClickHandler: (taskId: string) => void
    changeTaskStatusOnChangeHandler: (taskId: string, isDone: boolean) => void
    changeTaskTitleOnChangeHandler: (taskId: string, newTitle: string) => void
}

//========================================================================================

export const Task: FC<TaskPropsType> = memo((props) => {

    console.log('task => R E N D E R')

    const removeTaskOnClickHandler = useCallback(() => {
        props.removeTaskOnClickHandler(props.taskId)
    }, [props.removeTaskOnClickHandler, props.taskId])

    const changeTaskStatusOnChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatusOnChangeHandler(props.taskId, event.currentTarget.checked)
    }, [props.changeTaskStatusOnChangeHandler, props.taskId])

    const changeTaskTitleOnChangeHandler = useCallback((newTitle: string) => {
        props.changeTaskTitleOnChangeHandler(props.taskId, newTitle)
    }, [props.changeTaskTitleOnChangeHandler, props.taskId])

    return (
        <div className={`${S.task} ${props.isDone && S.isDone}`}>

            <Checkbox
                checked={props.isDone}
                onChange={changeTaskStatusOnChangeHandler}
                color="secondary"
            />

            <EditableSpan onChangeTitle={changeTaskTitleOnChangeHandler}>{props.title}</EditableSpan>

            <IconButton onClick={removeTaskOnClickHandler}>
                <DeleteIcon/>
            </IconButton>

        </div>
    )
})