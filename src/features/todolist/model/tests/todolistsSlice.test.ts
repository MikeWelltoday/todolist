import {
	TodolistFilterReducerType,
	TodolistReducerType, todolistsActions,
	todolistsSlice,
	todolistsThunks
} from 'features/todolist/model/todolistsSlice'
import { TodolistApiType } from '../../api/todolistsAPI'


let startState: TodolistReducerType[]

beforeEach(() => {
	startState = [
		{ id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
		{ id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' }
	]
})

test('removeTodolist', () => {
	const action = todolistsThunks.removeTodolistTC.fulfilled(
		{ todolistId: 'todolistId2' },
		'',
		'todolistId2'
	)
	const endState = todolistsSlice(startState, action)
	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe('todolistId1')
})

test('addTodolist', () => {
	const newTodolistFromAPI = { id: 'todolistId3', title: 'todolist from server', addedDate: '', order: 0 }
	const action = todolistsThunks.addTodolistTC.fulfilled(
		{ newTodolistFromAPI },
		'',
		newTodolistFromAPI.title
	)
	const endState = todolistsSlice(startState, action)
	const keys = Object.keys(endState[0])
	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe(newTodolistFromAPI.title)
	expect(endState[0].filter).toBe('all')
	expect(endState[0].entityStatus).toBe('idle')
	expect(keys.length).toBe(6)
})

test('changeTodolistTitle', () => {
	const changedTodolistTitle = 'New Todolist'
	const action = todolistsThunks.updateTodolistTitleTC.fulfilled(
		{ todolistId: 'todolistId2', title: changedTodolistTitle },
		'',
		{ todolistId: 'todolistId2', newTitle: changedTodolistTitle }
	)
	const endState = todolistsSlice(startState, action)
	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(changedTodolistTitle)
})

test('changeTodolistFilter', () => {
	const newFilter: TodolistFilterReducerType = 'completed'
	const endState = todolistsSlice(startState,
		todolistsActions.changeTodolistFilter({ todolistId: 'todolistId2', filter: newFilter }))
	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})

test('setTodolists', () => {
	const newTodolists: TodolistApiType[] = [
		{ id: 'todolistId3', title: 'new todolists', addedDate: '', order: 0 }
	]
	const action = todolistsThunks.fetchTodolistsTC.fulfilled(
		{ todolistsFromAPI: newTodolists },
		'',
		undefined
	)
	const endState = todolistsSlice(startState, action)
	const keys = Object.keys(endState[0])
	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(newTodolists[0].id)
	expect(endState[0].title).toBe(newTodolists[0].title)
	expect(endState[0].filter).toBe('all')
	expect(endState[0].entityStatus).toBe('idle')
	expect(keys.length).toBe(6)
})

test('changeTodolistEntityStatus', () => {
	const newEntityStatus = 'loading'
	const endState = todolistsSlice(startState,
		todolistsActions.changeTodolistEntityStatus({ todolistId: 'todolistId2', newStatus: newEntityStatus }))
	expect(endState[0].entityStatus).toBe('idle')
	expect(endState[1].entityStatus).toBe(newEntityStatus)
})