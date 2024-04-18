import React, { FC, memo, useCallback, useEffect } from 'react'
import S from 'features/todolistsList/ui/todolist/Todolist.module.scss'
import { AddItemForm } from 'components'
import { useAppDispatch } from 'app/store'
import { tasksThunks } from 'features/todolistsList/model/task/tasks-reducer'
import { RequestStatusType, TodolistFilterReducerType } from 'features/todolistsList/model/todolist/todolists-reducer'
import { TodolistTitle } from './todolistTitle/TodolistTitle'
import { Tasks } from './tasks/Tasks'
import { TodolistButtons } from './todolistsButtons/TodolistButtons'


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