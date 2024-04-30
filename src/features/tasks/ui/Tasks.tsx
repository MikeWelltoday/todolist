import S from './Tasks.module.scss'
import React, { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { tasksSelectors } from '../model/tasksSlice'
import { TodolistFilterType } from '../../todolist/model/todolistsSlice'
import { Task } from '../../task/Task'
import { AppRootState } from 'state/store/store'

//========================================================================================

export type TasksProps = {
	todolistId: string
	todolistFilter: TodolistFilterType
}

//========================================================================================

export const Tasks: FC<TasksProps> = memo((props) => {

	// let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasksSlice[props.todolistId])

	let tasks = useSelector((state: AppRootState) =>
		tasksSelectors.selectTasks({ tasksSlice: state.tasksSlice })(props.todolistId))


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
		) : (<div>no tasks</div>)
	)
})