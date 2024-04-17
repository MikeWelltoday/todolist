import { tasksReducer, TasksReducerType } from 'features/todolistsList/model/task/tasks-reducer'
import {
	TodolistReducerType,
	todolistsReducer,
	todolistsThunks
} from 'features/todolistsList/model/todolist/todolists-reducer'

//========================================================================================

let startStateTasks: TasksReducerType
let startStateTodolists: TodolistReducerType[]

beforeEach(() => {
	startStateTasks = {}
	startStateTodolists = []
})

test('addTodolist', () => {
	const newTodolistFromAPI = { id: 'todolistId3', title: 'todolist from server', addedDate: '', order: 0 }
	const action = todolistsThunks.addTodolistTC.fulfilled(
		{ newTodolistFromAPI },
		'',
		newTodolistFromAPI.title
	)
	const endStateTasks = tasksReducer(startStateTasks, action)
	const endStateTodolists = todolistsReducer(startStateTodolists, action)
	const keys = Object.keys(endStateTasks)
	const idFromTasks = keys[0]
	const idFromTodolists = endStateTodolists[0].id
	expect(idFromTasks).toBe(newTodolistFromAPI.id)
	expect(idFromTodolists).toBe(newTodolistFromAPI.id)
	expect(idFromTasks).toBe(idFromTodolists)
})