import React, { FC, memo, useCallback } from 'react'
import S from './TodolisTitle.module.scss'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan, RequestEntityStatusType, useAppDispatch } from '../../shared'
import { todolistsActions } from '../todolist/model/todolistsSlice'


type TodolistTitlePropsType = {
	todolistId: string
	title: string
	entityStatus: RequestEntityStatusType
}


export const TodolistTitle: FC<TodolistTitlePropsType> = memo((props) => {

	const dispatch = useAppDispatch()

	const removeTodolistCallBack = () => {
		dispatch(todolistsActions.removeTodolistThunk(props.todolistId))
	}

	const changeTodolistTitleCallBack = useCallback(((newTitle: string) => {
		dispatch(todolistsActions.updateTodolistTitleThunk({ todolistId: props.todolistId, newTitle }))
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