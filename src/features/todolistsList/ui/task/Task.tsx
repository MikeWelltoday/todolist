import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import S from 'features/todolistsList/ui/task/Task.module.scss'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan } from 'components'
import { TaskStatusesEnum } from 'features/todolistsList/api/tasks-api'
import { RequestStatusType } from 'features/todolistsList/model/todolist/todolists-reducer'
import { tasksThunks } from 'features/todolistsList/model/task/tasks-reducer'
import { useAppDispatch } from 'app/store'

//========================================================================================

type TaskPropsType = {
	todolistId: string
	taskId: string
	title: string
	status: TaskStatusesEnum
	entityStatus: RequestStatusType
}

//========================================================================================

export const Task: FC<TaskPropsType> = memo((props) => {

	console.log('🍓 TASK')

	const dispatch = useAppDispatch()
	const isDisabled = props.entityStatus === 'loading'

	const removeTaskOnClickHandler = () => {
		dispatch(tasksThunks.removeTaskTC({ todolistId: props.todolistId, taskId: props.taskId }))
	}

	const changeTaskStatusOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const status: TaskStatusesEnum = event.currentTarget.checked ? TaskStatusesEnum.Completed : TaskStatusesEnum.New
		dispatch(tasksThunks.updateTaskTC({
			todolistId: props.todolistId,
			taskId: props.taskId,
			taskUpdateModel: { status }
		}))
	}

	const changeTaskTitleOnChangeHandler = useCallback((newTitle: string) => {
		dispatch(tasksThunks.updateTaskTC({
			todolistId: props.todolistId,
			taskId: props.taskId,
			taskUpdateModel: { title: newTitle }
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