import React, { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../../../../store/store'
import { TaskType } from '../../../model/task/tasks-reducer'
import { TodolistFilterReducerType } from '../../../model/todolist/todolists-reducer'
import S from './Tasks.module.scss'
import { Task } from '../../task/Task'

type TasksPropsType = {
	todolistId: string
	todolistFilter: TodolistFilterReducerType
}

export const Tasks: FC<TasksPropsType> = memo((props) => {

	let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasksReducer[props.todolistId])

	if (props.todolistFilter === 'active') {
		tasks = tasks.filter(item => !item.status)
	}
	if (props.todolistFilter === 'completed') {
		tasks = tasks.filter(item => item.status)
	}

	return (
		tasks.length ? (
			<div className={S.Tasks}>
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
			</div>
		) : (<div>NO TASKS</div>)
	)
})