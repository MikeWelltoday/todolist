import React, { useEffect, useState } from 'react'
import { TaskPrioritiesEnum, tasksAPI, TaskStatusesEnum, ApiUpdateTaskModelType } from 'api'

//========================================================================================

export default {
	title: 'API/tasks'
}

//========================================================================================

const todolistID = '7f9c296a-bbe9-4803-a3b5-eaac8f7d3bb7'
const taskToDeleteID = 'd0479913-b474-4cf9-91ed-aa04ef7a85eb'
const taskToUpdateID = 'e698d706-b877-4fd4-a594-e3a7fdf2f0a8'

export const GetTask = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		tasksAPI.getTasks(todolistID).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		tasksAPI.createTask(todolistID, '🍌').then(res => setState(res.data))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		tasksAPI.deleteTask(todolistID, taskToDeleteID).then(res => setState(res.data))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
	const [state, setState] = useState<any>(null)

	const model: ApiUpdateTaskModelType = {
		title: '🍙🍙🍙',
		description: 'description',
		status: TaskStatusesEnum.Draft,
		priority: TaskPrioritiesEnum.High,
		startDate: '',
		deadline: ''
	}

	useEffect(() => {
		tasksAPI.updateTask(todolistID, taskToUpdateID, model).then(res => setState(res.data))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}