import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import S from 'features/task/Task.module.scss'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan, RequestEntityStatus, TaskStatusesEnum, useAppDispatch } from 'shared'
import { tasksActions } from '../tasks/model/tasksSlice'

//========================================================================================

type TaskPropsType = {
	todolistId: string
	taskId: string
	title: string
	status: TaskStatusesEnum
	entityStatus: RequestEntityStatus
}

//========================================================================================


export const Task: FC<TaskPropsType> = memo((props) => {

	const dispatch = useAppDispatch()
	const isDisabled = props.entityStatus === 'loading'

	const removeTaskHandler = () => {
		dispatch(tasksActions.removeTaskThunk({ todolistId: props.todolistId, taskId: props.taskId }))
	}

	const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const status: TaskStatusesEnum = event.currentTarget.checked ? TaskStatusesEnum.Completed : TaskStatusesEnum.New
		dispatch(tasksActions.updateTaskThunk({
			todolistId: props.todolistId, taskId: props.taskId, taskToUpdateModel: { status }
		}))
	}

	const changeTaskTitleHandler = useCallback((newTitle: string) => {
		dispatch(tasksActions.updateTaskThunk({
			todolistId: props.todolistId, taskId: props.taskId, taskToUpdateModel: { title: newTitle }
		}))
	}, [props.todolistId, props.taskId])


	return (
		<div className={`${S.task} ${props.status && S.isDone}`}>

			<div>

				<Checkbox
					checked={!!props.status}
					onChange={changeTaskStatusHandler}
					disabled={isDisabled}
				/>

				<EditableSpan
					title={props.title}
					onChangeTitle={changeTaskTitleHandler}
					entityStatus={props.entityStatus}
				/>

			</div>

			<IconButton onClick={removeTaskHandler} disabled={isDisabled}>
				<DeleteIcon />
			</IconButton>

		</div>
	)
})