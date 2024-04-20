import React, { FC, memo, useCallback, useEffect } from 'react'
import S from 'features/todolist/ui/Todolist.module.scss'
import { useAppDispatch } from 'store/store'
import { tasksThunks } from 'features/tasks/model/tasksSlice'
import { TodolistFilterReducerType } from 'features/todolist/model/todolistsSlice'
import { TodolistTitle } from '../../todolistTitle/TodolistTitle'
import { Tasks } from '../../tasks/ui/Tasks'
import { TodolistButtons } from '../../todolistButtons/TodolistButtons'
import { AddItemForm, RequestStatusType } from '../../../shared'


type TodolistPropsType = {
	todolistId: string
	title: string
	todolistFilter: TodolistFilterReducerType
	entityStatus: RequestStatusType

	demo?: boolean
}


export const Todolist: FC<TodolistPropsType> = memo((props) => {

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (props.demo) return
	}, [])

	const addTaskHandler = useCallback(((title: string) => {
		return dispatch(tasksThunks.addTaskTC({ todolistId: props.todolistId, newTitle: title })).unwrap()
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