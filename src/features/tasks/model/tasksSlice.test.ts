import { tasksActions, tasksSlice, TasksSliceType } from './tasksSlice'
import { TodolistApiType } from 'features/todolist/api/todolists.api'
import { TaskPrioritiesEnum, TaskStatusesEnum } from 'shared'
import { todolistsActions } from '../../todolist/model/todolistsSlice'

let startState: TasksSliceType
beforeEach(() => {
	startState = {
		'todolistId1': [
			{
				todoListId: 'todolistId1',
				id: '1',
				title: 'React',
				status: TaskStatusesEnum.Completed,
				priority: TaskPrioritiesEnum.Low,
				description: '',
				order: 0,
				completed: false,
				addedDate: '',
				startDate: '',
				deadline: '',
				entityStatus: 'idle'
			},
			{
				todoListId: 'todolistId1',
				id: '2',
				title: 'Redux',
				status: TaskStatusesEnum.New,
				priority: TaskPrioritiesEnum.Low,
				description: '',
				order: 0,
				completed: false,
				addedDate: '',
				startDate: '',
				deadline: '',
				entityStatus: 'idle'
			}

		],
		'todolistId2': [
			{
				todoListId: 'todolistId2',
				id: '1',
				title: 'Book',
				status: TaskStatusesEnum.New,
				priority: TaskPrioritiesEnum.Low,
				description: '',
				order: 0,
				completed: false,
				addedDate: '',
				startDate: '',
				deadline: '',
				entityStatus: 'idle'
			},
			{
				todoListId: 'todolistId2',
				id: '2',
				title: 'Milk',
				status: TaskStatusesEnum.Completed,
				priority: TaskPrioritiesEnum.Low,
				description: '',
				order: 0,
				completed: false,
				addedDate: '',
				startDate: '',
				deadline: '',
				entityStatus: 'idle'
			}
		]
	}
})

test('removeTaskThunk', () => {
	const action = tasksActions.removeTaskThunk.fulfilled(
		{ todolistId: 'todolistId2', taskId: '2' },
		'metaData',
		{ todolistId: 'todolistId2', taskId: '2' }
	)
	const endState = tasksSlice(startState, action)
	expect(endState['todolistId1'].length).toBe(2)
	expect(endState['todolistId2'].length).toBe(1)
	expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})


test('addTaskThunk', () => {
	const newTaskFromAPI = {
		todoListId: 'todolistId2',
		id: '2lwjk-1-dcjk1',
		title: 'Title form Server',
		status: TaskStatusesEnum.New,
		priority: TaskPrioritiesEnum.Low,
		description: '',
		order: 0,
		completed: false,
		addedDate: '',
		startDate: '',
		deadline: ''
	}

	const action = tasksActions.addTaskThunk.fulfilled(
		{ newTaskFromAPI },
		'metaData',
		{ todolistId: newTaskFromAPI.todoListId, newTitle: newTaskFromAPI.title }
	)

	const endState = tasksSlice(startState, action)
	const keysLength = Object.keys(endState['todolistId2'][0]).length
	expect(endState['todolistId1'].length).toBe(2)
	expect(endState['todolistId2'].length).toBe(3)
	expect(endState['todolistId2'][0].id).toBe(newTaskFromAPI.id)
	expect(endState['todolistId2'][0].title).toBe(newTaskFromAPI.title)
	expect(endState['todolistId2'][0].status).toBe(TaskStatusesEnum.New)
	expect(endState['todolistId2'][0].entityStatus).toBe('idle')
	expect(keysLength).toBe(12)
})


test('updateTaskThunk', () => {
	const newTitle = 'MEAT'
	const newStatus = TaskStatusesEnum.New
	const updatedTask = { ...startState['todolistId2'][1], title: newTitle, status: newStatus }
	const action = tasksActions.updateTaskThunk.fulfilled(
		{ todolistId: 'todolistId2', taskId: '2', taskUpdatedModel: updatedTask },
		'metaData',
		{ todolistId: 'todolistId2', taskId: '2', taskToUpdateModel: { title: newTitle, status: newStatus } }
	)
	const endState = tasksSlice(startState, action)
	expect(endState['todolistId1'][1].title).toBe('Redux')
	expect(endState['todolistId2'][1].title).toBe(newTitle)
	expect(endState['todolistId1'][1].status).toBe(TaskStatusesEnum.New)
	expect(endState['todolistId2'][1].status).toBe(TaskStatusesEnum.New)
})


test('addTodolistThunk', () => {
	const newTodolistFromAPI = { id: 'todolistId3', title: 'todolist from server', addedDate: '', order: 0 }
	const action = todolistsActions.addTodolistThunk.fulfilled(
		{ newTodolistFromAPI },
		'',
		newTodolistFromAPI.title
	)
	const endState = tasksSlice(startState, action)
	const keys = Object.keys(endState)
	const newKey = keys.filter(k => k !== 'todolistId1' && k !== 'todolistId2')[0]
	expect(keys.length).toBe(3)
	expect(newKey).toBe(newTodolistFromAPI.id)
	expect(endState[newKey]).toEqual([])
})


test('removeTodolistThunk', () => {
	const action = todolistsActions.removeTodolistThunk.fulfilled(
		{ todolistId: 'todolistId2' },
		'',
		'todolistId2'
	)
	const endState = tasksSlice(startState, action)
	const keys = Object.keys(endState)
	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).toBeUndefined()
})


test('fetchTodolistsThunk', () => {
	const todolistsFromAPI: TodolistApiType[] =
		[
			{ id: 'todolistId3', title: 'new todolists 3', addedDate: '', order: 0 },
			{ id: 'todolistId4', title: 'new todolists 4', addedDate: '', order: 0 },
			{ id: 'todolistId5', title: 'new todolists 5', addedDate: '', order: 0 }
		]
	const action = todolistsActions.fetchTodolistsThunk.fulfilled(
		{ todolistsFromAPI },
		'',
		undefined
	)
	const endState = tasksSlice(startState, action)
	const endStateLength = Object.keys(endState).length
	expect(endStateLength).toBe(3)
	expect(endState['todolistId3']).toEqual([])
	expect(endState['todolistId4']).toEqual([])
	expect(endState['todolistId5']).toEqual([])
})

test('changeTasksEntityStatusAction', () => {
	const endState = tasksSlice(startState, tasksActions.changeTasksEntityStatusAction({
		todolistId: 'todolistId2',
		taskId: '2',
		newStatus: 'loading'
	}))
	expect(endState['todolistId1'][0].entityStatus).toBe('idle')
	expect(endState['todolistId1'][1].entityStatus).toBe('idle')
	expect(endState['todolistId2'][0].entityStatus).toBe('idle')
	expect(endState['todolistId2'][1].entityStatus).toBe('loading')
})

test('fetchTasksThunk', () => {
	const todolistID = 'todolistId1'
	const tasksFromAPI = [
		{
			todoListId: 'todolistId1',
			id: '3',
			title: 'From Server with id 3',
			status: TaskStatusesEnum.Completed,
			priority: TaskPrioritiesEnum.Low,
			description: '',
			order: 0,
			completed: false,
			addedDate: '',
			startDate: '',
			deadline: ''
		},
		{
			todoListId: 'todolistId1',
			id: '4',
			title: 'From Server with id 4',
			status: TaskStatusesEnum.New,
			priority: TaskPrioritiesEnum.Low,
			description: '',
			order: 0,
			completed: false,
			addedDate: '',
			startDate: '',
			deadline: ''
		}
	]

	const action = tasksActions.fetchTasksThunk.fulfilled(
		{ tasks: tasksFromAPI, todolistId: todolistID },
		'metaData',
		todolistID
	)

	const endState = tasksSlice(startState, action)
	const taskKeysLength = Object.keys(endState[todolistID][0]).length
	expect(endState[todolistID].length).toBe(2)
	expect(endState[todolistID][0].id).toBe('3')
	expect(endState[todolistID][1].id).toBe('4')
	expect(endState[todolistID][0].title).toBe('From Server with id 3')
	expect(endState[todolistID][1].title).toBe('From Server with id 4')
	expect(endState[todolistID][0].entityStatus).toBe('idle')
	expect(endState[todolistID][1].entityStatus).toBe('idle')
	expect(taskKeysLength).toBe(12)
})