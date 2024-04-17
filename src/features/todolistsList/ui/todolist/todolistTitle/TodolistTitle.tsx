import React, { FC, memo, useCallback } from 'react'
import S from './TodolisTitle.module.scss'
import { EditableSpan } from '../../../../../components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { RequestStatusType, todolistsThunks } from '../../../model/todolist/todolists-reducer'
import { useAppDispatch } from '../../../../../app/store'


type TodolistTitlePropsType = {
	todolistId: string
	title: string
	entityStatus: RequestStatusType
}


export const TodolistTitle: FC<TodolistTitlePropsType> = memo((props) => {

	const dispatch = useAppDispatch()

	const removeTodolistCallBack = () => {
		dispatch(todolistsThunks.removeTodolistTC(props.todolistId))
	}

	const changeTodolistTitleCallBack = useCallback(((newTitle: string) => {
		dispatch(todolistsThunks.updateTodolistTitleTC({ todolistId: props.todolistId, newTitle }))
	}), [props.todolistId])


	return (
		<div className={S.todolistTitle}>
			<EditableSpan
				title={props.title}
				onChangeTitle={changeTodolistTitleCallBack}
				entityStatus={props.entityStatus}
			/>

			<IconButton onClick={removeTodolistCallBack} disabled={props.entityStatus === 'loading'}>
				<DeleteIcon />
			</IconButton>
		</div>
	)
})