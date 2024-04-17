import { tasksActions, tasksReducer, TasksReducerType, tasksThunks } from './tasks-reducer'
import { TaskPrioritiesEnum, TaskStatusesEnum } from 'features/todolistsList/api/tasks-api'
import { todolistsThunks } from 'features/todolistsList/model/todolist/todolists-reducer'
import { TodolistApiType } from 'features/todolistsList/api/todolists-api'

let startState: TasksReducerType
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

test('removeTask', () => {
	const action = tasksThunks.removeTaskTC.fulfilled(
		{ todolistId: 'todolistId2', taskId: '2' },
		'metaData',
		{ todolistId: 'todolistId2', taskId: '2' }
	)
	const endState = tasksReducer(startState, action)
	expect(endState['todolistId1'].length).toBe(2)
	expect(endState['todolistId2'].length).toBe(1)
	expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})


test('addTask', () => {
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

	const action = tasksThunks.addTaskTC.fulfilled(
		{ newTaskFromAPI },
		'metaData',
		{ todolistId: newTaskFromAPI.todoListId, newTitle: newTaskFromAPI.title }
	)

	const endState = tasksReducer(startState, action)
	const keysLength = Object.keys(endState['todolistId2'][0]).length
	expect(endState['todolistId1'].length).toBe(2)
	expect(endState['todolistId2'].length).toBe(3)
	expect(endState['todolistId2'][0].id).toBe(newTaskFromAPI.id)
	expect(endState['todolistId2'][0].title).toBe(newTaskFromAPI.title)
	expect(endState['todolistId2'][0].status).toBe(TaskStatusesEnum.New)
	expect(endState['todolistId2'][0].entityStatus).toBe('idle')
	expect(keysLength).toBe(12)
})


test('updateTask', () => {
	const newTitle = 'MEAT'
	const newStatus = TaskStatusesEnum.New
	const updatedTask = { ...startState['todolistId2'][1], title: newTitle, status: newStatus }
	const action = tasksThunks.updateTaskTC.fulfilled(
		{ todolistId: 'todolistId2', taskId: '2', taskUpdateModel: updatedTask },
		'metaData',
		{ todolistId: 'todolistId2', taskId: '2', taskUpdateModel: { title: newTitle, status: newStatus } }
	)
	const endState = tasksReducer(startState, action)
	expect(endState['todolistId1'][1].title).toBe('Redux')
	expect(endState['todolistId2'][1].title).toBe(newTitle)
	expect(endState['todolistId1'][1].status).toBe(TaskStatusesEnum.New)
	expect(endState['todolistId2'][1].status).toBe(TaskStatusesEnum.New)
})


test('addTodolist', () => {
	const newTodolistFromAPI = { id: 'todolistId3', title: 'todolist from server', addedDate: '', order: 0 }
	const action = todolistsThunks.addTodolistTC.fulfilled(
		{ newTodolistFromAPI },
		'',
		newTodolistFromAPI.title
	)
	const endState = tasksReducer(startState, action)
	const keys = Object.keys(endState)
	const newKey = keys.filter(k => k !== 'todolistId1' && k !== 'todolistId2')[0]
	expect(keys.length).toBe(3)
	expect(newKey).toBe(newTodolistFromAPI.id)
	expect(endState[newKey]).toEqual([])
})


test('removeTodolist', () => {
	const action = todolistsThunks.removeTodolistTC.fulfilled(
		{ todolistId: 'todolistId2' },
		'',
		'todolistId2'
	)
	const endState = tasksReducer(startState, action)
	const keys = Object.keys(endState)
	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).toBeUndefined()
})


test('setTodolists', () => {
	const todolistsFromAPI: TodolistApiType[] =
		[
			{ id: 'todolistId3', title: 'new todolists 3', addedDate: '', order: 0 },
			{ id: 'todolistId4', title: 'new todolists 4', addedDate: '', order: 0 },
			{ id: 'todolistId5', title: 'new todolists 5', addedDate: '', order: 0 }
		]
	const action = todolistsThunks.fetchTodolistsTC.fulfilled(
		{ todolistsFromAPI },
		'',
		undefined
	)
	const endState = tasksReducer(startState, action)
	const endStateLength = Object.keys(endState).length
	expect(endStateLength).toBe(3)
	expect(endState['todolistId3']).toEqual([])
	expect(endState['todolistId4']).toEqual([])
	expect(endState['todolistId5']).toEqual([])
})

test('changeTasksEntityStatusAC', () => {
	const endState = tasksReducer(startState, tasksActions.changeTasksEntityStatusAC({
		todolistId: 'todolistId2',
		taskId: '2',
		newStatus: 'loading'
	}))
	expect(endState['todolistId1'][0].entityStatus).toBe('idle')
	expect(endState['todolistId1'][1].entityStatus).toBe('idle')
	expect(endState['todolistId2'][0].entityStatus).toBe('idle')
	expect(endState['todolistId2'][1].entityStatus).toBe('loading')
})

test('setTasks', () => {
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

	const action = tasksThunks.fetchTasksTC.fulfilled(
		{ tasks: tasksFromAPI, todolistId: todolistID },
		'metaData',
		todolistID
	)

	const endState = tasksReducer(startState, action)
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