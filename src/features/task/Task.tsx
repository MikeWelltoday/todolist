import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import S from './Task.module.scss'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan } from 'components'
import { TaskStatusesEnum } from 'api'
import { RequestStatusType } from 'state'

//========================================================================================

type TaskPropsType = {
	taskId: string
	title: string
	status: TaskStatusesEnum
	entityStatus: RequestStatusType

	removeTaskOnClickHandler: (taskId: string) => void
	changeTaskStatusOnChangeHandler: (taskId: string, status: TaskStatusesEnum) => void
	changeTaskTitleOnChangeHandler: (taskId: string, newTitle: string) => void
}

//========================================================================================

export const Task: FC<TaskPropsType> = memo((props) => {

	console.log('🍓 TASK')

	const isDisabled = props.entityStatus === 'loading'

	const removeTaskOnClickHandler = useCallback(() => {
		props.removeTaskOnClickHandler(props.taskId)
	}, [props.removeTaskOnClickHandler, props.taskId])

	const changeTaskStatusOnChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const status = event.currentTarget.checked ? TaskStatusesEnum.Completed : TaskStatusesEnum.New
		props.changeTaskStatusOnChangeHandler(props.taskId, status)

	}, [props.changeTaskStatusOnChangeHandler, props.taskId])

	const changeTaskTitleOnChangeHandler = useCallback((newTitle: string) => {
		props.changeTaskTitleOnChangeHandler(props.taskId, newTitle)
	}, [props.changeTaskTitleOnChangeHandler, props.taskId])

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