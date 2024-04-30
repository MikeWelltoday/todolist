import { tasksSlice, TasksSliceType } from 'features/tasks/model/tasksSlice'
import {
	TodolistUiType, todolistsSlice, todolistsActions
} from 'features/todolist/model/todolistsSlice'


let startStateTasks: TasksSliceType
let startStateTodolists: TodolistUiType[]

beforeEach(() => {
	startStateTasks = {}
	startStateTodolists = []
})

test('addTodolist', () => {
	const newTodolistFromAPI = { id: 'todolistId3', title: 'todolist from server', addedDate: '', order: 0 }
	const action = todolistsActions.addTodolistThunk.fulfilled(
		{ newTodolistFromAPI },
		'',
		newTodolistFromAPI.title
	)
	const endStateTasks = tasksSlice(startStateTasks, action)
	const endStateTodolists = todolistsSlice(startStateTodolists, action)
	const keys = Object.keys(endStateTasks)
	const idFromTasks = keys[0]
	const idFromTodolists = endStateTodolists[0].id
	expect(idFromTasks).toBe(newTodolistFromAPI.id)
	expect(idFromTodolists).toBe(newTodolistFromAPI.id)
	expect(idFromTasks).toBe(idFromTodolists)
})