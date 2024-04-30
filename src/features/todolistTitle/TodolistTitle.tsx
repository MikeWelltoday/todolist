import React, { memo, useCallback } from 'react'
import S from './TodolisTitle.module.scss'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan, RequestEntityStatus, useAppDispatch } from 'shared'
import { todolistsActions } from '../todolist/model/todolistsSlice'

//========================================================================================

type Props = {
	todolistId: string
	title: string
	entityStatus: RequestEntityStatus
}

//========================================================================================

export const TodolistTitle = memo((props: Props) => {

	const dispatch = useAppDispatch()

	const removeTodolistHandler = () => {
		dispatch(todolistsActions.removeTodolistThunk(props.todolistId))
	}

	const changeTodolistTitleHandler = useCallback(((newTitle: string) => {
		dispatch(todolistsActions.updateTodolistTitleThunk({ todolistId: props.todolistId, newTitle }))
	}), [props.todolistId])


	return (
		<div className={S.todolistTitle}>
			<EditableSpan
				title={props.title}
				onChangeTitle={changeTodolistTitleHandler}
				entityStatus={props.entityStatus}
			/>

			<IconButton onClick={removeTodolistHandler} disabled={props.entityStatus === 'loading'}>
				<DeleteIcon />
			</IconButton>
		</div>
	)
})