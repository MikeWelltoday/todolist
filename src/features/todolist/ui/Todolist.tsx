import React, { FC, memo, useCallback, useEffect } from 'react'
import S from 'features/todolist/ui/Todolist.module.scss'
import { TodolistTitle } from '../../todolistTitle/TodolistTitle'
import { Tasks } from '../../tasks/ui/Tasks'
import { TodolistButtons } from '../../todolistButtons/TodolistButtons'
import { AddItemForm, RequestEntityStatus, useAppDispatch } from 'shared'
import { TodolistFilterType } from '../model/todolistsSlice'
import { tasksActions } from '../../tasks/model/tasksSlice'

//========================================================================================

type TodolistProps = {
	todolistId: string
	title: string
	todolistFilter: TodolistFilterType
	entityStatus: RequestEntityStatus

	demo?: boolean
}

//========================================================================================

export const Todolist: FC<TodolistProps> = memo((props) => {

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (props.demo) return
	}, [])

	const addTaskHandler = useCallback(((title: string) => {
		return dispatch(tasksActions.addTaskThunk({ todolistId: props.todolistId, newTitle: title })).unwrap()
	}), [props.todolistId])

	return (
		<div className={S.todolist}>
			<TodolistTitle todolistId={props.todolistId} title={props.title} entityStatus={props.entityStatus} />
			<AddItemForm addItem={addTaskHandler} todolistEntityStatus={props.entityStatus} />
			<Tasks todolistId={props.todolistId} todolistFilter={props.todolistFilter} />
			<TodolistButtons todolistId={props.todolistId} todolistFilter={props.todolistFilter} />
		</div>
	)
})