import S from './Tasks.module.scss'
import React, { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { TaskType } from '../model/tasksSlice'
import { TodolistFilterReducerType } from '../../todolist/model/todolistsSlice'
import { Task } from '../../task/Task'
import { AppRootStateType } from '../../../state/store/store'


type TasksPropsType = {
	todolistId: string
	todolistFilter: TodolistFilterReducerType
}

export const Tasks: FC<TasksPropsType> = memo((props) => {

	let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasksSlice[props.todolistId])

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