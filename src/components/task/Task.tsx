import React, {ChangeEvent, FC, memo, useCallback} from 'react'
import S from './Task.module.scss'
import {EditableSpan} from '../editableSpan/EditableSpan'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

//========================================================================================
// 🎲 .T.Y.P.E.S.

type TaskPropsType = {
    taskId: string
    title: string
    isDone: boolean

    removeTaskOnClickHandler: (taskId: string) => void
    changeTaskStatusOnChangeHandler: (taskId: string, isDone: boolean) => void
    changeTaskTitleOnChangeHandler: (taskId: string, newTitle: string) => void
}

//========================================================================================
// 🧁 .C.O.P.O.N.E.N.T.

export const Task: FC<TaskPropsType> = memo((props) => {

    const removeTaskOnClickHandler = useCallback(() => {
        props.removeTaskOnClickHandler(props.taskId)
    }, [props.removeTaskOnClickHandler])

    const changeTaskStatusOnChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatusOnChangeHandler(props.taskId, event.currentTarget.checked)
    }, [props.changeTaskStatusOnChangeHandler])

    const changeTaskTitleOnChangeHandler = useCallback((newTitle: string) => {
        props.changeTaskTitleOnChangeHandler(props.taskId, newTitle)
    }, [props.changeTaskTitleOnChangeHandler])

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