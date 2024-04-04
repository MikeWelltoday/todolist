import { TodolistReducerType, todolistsActions, todolistsReducer } from 'state'
import { tasksReducer, TasksReducerType } from 'state'

//========================================================================================

let startStateTasks: TasksReducerType
let startStateTodolists: TodolistReducerType[]

beforeEach(() => {
	 startStateTasks = {}
	 startStateTodolists = []
})

test('addTodolist', () => {
	 const newTodolistFromAPI = { id: 'todolistId3', title: 'todolist from server', addedDate: '', order: 0 }
	 const endStateTasks = tasksReducer(startStateTasks, todolistsActions.addTodolist({ newTodolistFromAPI }))
	 const endStateTodolists = todolistsReducer(startStateTodolists, todolistsActions.addTodolist({ newTodolistFromAPI }))
	 const keys = Object.keys(endStateTasks)
	 const idFromTasks = keys[0]
	 const idFromTodolists = endStateTodolists[0].id
	 expect(idFromTasks).toBe(newTodolistFromAPI.id)
	 expect(idFromTodolists).toBe(newTodolistFromAPI.id)
	 expect(idFromTasks).toBe(idFromTodolists)
})