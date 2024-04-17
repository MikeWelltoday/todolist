import React, { FC, memo, useCallback, useEffect } from 'react'
import S from 'features/todolistsList/ui/todolist/Todolist.module.scss'
import { AddItemForm, FilterButton } from 'components'
import { AppRootStateType, useAppDispatch } from 'app/store'
import { tasksThunks, TaskType } from 'features/todolistsList/model/task/tasks-reducer'
import {
	RequestStatusType,
	TodolistFilterReducerType,
	todolistsActions
} from 'features/todolistsList/model/todolist/todolists-reducer'
import { TodolistTitle } from './todolistTitle/TodolistTitle'
import { useSelector } from 'react-redux'
import { Task } from '../task/Task'


//========================================================================================

type TodolistPropsType = {
	todolistId: string
	title: string
	todolistFilter: TodolistFilterReducerType
	entityStatus: RequestStatusType

	demo?: boolean

}

//========================================================================================

export const Todolist: FC<TodolistPropsType> = memo((props) => {

	console.log('🍄 TODOLIST')

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (props.demo) return
	}, [])

	let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasksReducer[props.todolistId])

	if (props.todolistFilter === 'active') {
		tasks = tasks.filter(item => !item.status)
	}
	if (props.todolistFilter === 'completed') {
		tasks = tasks.filter(item => item.status)
	}

	const addTaskHandler = useCallback(((title: string) => {
		dispatch(tasksThunks.addTaskTC({ todolistId: props.todolistId, newTitle: title }))
	}), [props.todolistId])

	const changeTaskFilterAllOnClickHandler = useCallback((() => {
		dispatch(todolistsActions.changeTodolistFilter({ todolistId: props.todolistId, filter: 'all' }))
	}), [props.todolistId])

	const changeTaskFilterActiveOnClickHandler = useCallback((() => {
		dispatch(todolistsActions.changeTodolistFilter({ todolistId: props.todolistId, filter: 'active' }))
	}), [props.todolistId])

	const changeTaskFilterCompletedOnClickHandler = useCallback((() => {
		dispatch(todolistsActions.changeTodolistFilter({ todolistId: props.todolistId, filter: 'completed' }))
	}), [props.todolistId])

	return (
		<div className={S.todolist}>

			<TodolistTitle
				todolistId={props.todolistId}
				title={props.title}
				entityStatus={props.entityStatus}
			/>

			<AddItemForm addItem={addTaskHandler} todolistEntityStatus={props.entityStatus} />

			{tasks.length ?
				(<div className={S.tasksList}>
					{tasks.map(t => {
						return (
							<Task
								key={t.id}
								todolistId={t.todoListId}
								taskId={t.id}
								title={t.title}
								status={t.status}
								entityStatus={t.entityStatus}
							/>
						)
					})}
				</div>) : <div>NO TASKS</div>}

			<div className={S.buttonContainer}>
				<FilterButton
					title={'All'}
					color={'inherit'}
					variant={props.todolistFilter === 'all' ? 'outlined' : 'text'}
					onClick={changeTaskFilterAllOnClickHandler}
				/>
				<FilterButton
					title={'Active'}
					color={'success'}
					variant={props.todolistFilter === 'active' ? 'outlined' : 'text'}
					onClick={changeTaskFilterActiveOnClickHandler}
				/>
				<FilterButton
					title={'Completed'}
					color={'secondary'}
					variant={props.todolistFilter === 'completed' ? 'outlined' : 'text'}
					onClick={changeTaskFilterCompletedOnClickHandler}
				/>
			</div>

		</div>
	)
})