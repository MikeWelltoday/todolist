import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import S from 'features/task/Task.module.scss'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan, RequestEntityStatusType, TaskStatusesEnum, useAppDispatch } from '../../shared'
import { tasksActions } from '../tasks/model/tasksSlice'


type PropsType = {
	todolistId: string
	taskId: string
	title: string
	status: TaskStatusesEnum
	entityStatus: RequestEntityStatusType
}


export const Task: FC<PropsType> = memo((props) => {

	const dispatch = useAppDispatch()
	const isDisabled = props.entityStatus === 'loading'

	const removeTaskOnClickHandler = () => {
		dispatch(tasksActions.removeTaskThunk({ todolistId: props.todolistId, taskId: props.taskId }))
	}

	const changeTaskStatusOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const status: TaskStatusesEnum = event.currentTarget.checked ? TaskStatusesEnum.Completed : TaskStatusesEnum.New
		dispatch(tasksActions.updateTaskThunk({
			todolistId: props.todolistId, taskId: props.taskId, taskToUpdateModel: { status }
		}))
	}

	const changeTaskTitleOnChangeHandler = useCallback((newTitle: string) => {
		dispatch(tasksActions.updateTaskThunk({
			todolistId: props.todolistId, taskId: props.taskId, taskToUpdateModel: { title: newTitle }
		}))
	}, [props.todolistId, props.taskId])


	return (
		<div className={`${S.task} ${props.status && S.isDone}`}>

			<Checkbox
				checked={!!props.status}
				onChange={changeTaskStatusOnChangeHandler}
				color='secondary'
				disabled={isDisabled}
			/>

			<EditableSpan
				title={props.title}
				onChangeTitle={changeTaskTitleOnChangeHandler}
				entityStatus={props.entityStatus}
			/>

			<IconButton onClick={removeTaskOnClickHandler} disabled={isDisabled}>
				<DeleteIcon />
			</IconButton>

		</div>
	)
})