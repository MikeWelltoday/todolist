import {
    addTaskAC,
    addTodolistAC,
    removeTaskAC,
    removeTodolistAC,
    setTasksAC,
    setTodolistsAC,
    tasksReducer,
    TasksReducerType,
    updateTaskAC
} from '../../state'
import {TaskPrioritiesEnum, TaskStatusesEnum, TodolistApiType} from '../../api'
import {changeTasksEntityStatusAC} from '../reducers/tasks-reducer'

//========================================================================================

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
                entityStatus: 'succeeded'
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
                entityStatus: 'succeeded'
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
                entityStatus: 'succeeded'
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
                entityStatus: 'succeeded'
            }
        ]
    }
})

test('REMOVE-TASK', () => {

    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(1)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('ADD-TASK', () => {

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

    const endState = tasksReducer(startState, addTaskAC(newTaskFromAPI))

    const keysLength = Object.keys(endState['todolistId2'][0]).length

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBe(newTaskFromAPI.id)
    expect(endState['todolistId2'][0].title).toBe(newTaskFromAPI.title)
    expect(endState['todolistId2'][0].status).toBe(TaskStatusesEnum.New)
    expect(endState['todolistId2'][0].entityStatus).toBe('succeeded')
    expect(keysLength).toBe(12)
})

test('UPDATE-TASK', () => {

    const newTitle = 'MEAT'
    const newStatus = TaskStatusesEnum.New

    const endState = tasksReducer(startState,
        updateTaskAC('todolistId2', '2', {title: newTitle, status: newStatus}))

    expect(endState['todolistId1'][1].title).toBe('Redux')
    expect(endState['todolistId2'][1].title).toBe(newTitle)
    expect(endState['todolistId1'][1].status).toBe(TaskStatusesEnum.New)
    expect(endState['todolistId2'][1].status).toBe(TaskStatusesEnum.New)
})

test('ADD-TODOLIST', () => {

    const newTodolistFromAPI = {id: 'todolistId3', title: 'todolist from server', addedDate: '', order: 0}

    const endState = tasksReducer(startState, addTodolistAC(newTodolistFromAPI))

    const keys = Object.keys(endState)
    const newKey = keys.filter(k => k !== 'todolistId1' && k !== 'todolistId2')[0]


    expect(keys.length).toBe(3)
    expect(newKey).toBe(newTodolistFromAPI.id)
    expect(endState[newKey]).toEqual([])
})

test('REMOVE-TODOLIST', () => {

    const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})

test('SET-TODOLISTS', () => {

    const todolistsFromAPI: TodolistApiType[] =
        [
            {id: 'todolistId3', title: 'new todolists 3', addedDate: '', order: 0},
            {id: 'todolistId4', title: 'new todolists 4', addedDate: '', order: 0},
            {id: 'todolistId5', title: 'new todolists 5', addedDate: '', order: 0}
        ]

    const endState = tasksReducer(startState, setTodolistsAC(todolistsFromAPI))

    const endStateLength = Object.keys(endState).length

    expect(endStateLength).toBe(3)
    expect(endState['todolistId3']).toEqual([])
    expect(endState['todolistId4']).toEqual([])
    expect(endState['todolistId5']).toEqual([])
})

test('SET-TASKS', () => {

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

    const endState = tasksReducer(startState, setTasksAC(todolistID, tasksFromAPI))

    const taskKeysLength = Object.keys(endState[todolistID][0]).length

    expect(endState[todolistID].length).toBe(2)
    expect(endState[todolistID][0].id).toBe('3')
    expect(endState[todolistID][1].id).toBe('4')
    expect(endState[todolistID][0].title).toBe('From Server with id 3')
    expect(endState[todolistID][1].title).toBe('From Server with id 4')
    expect(endState[todolistID][0].entityStatus).toBe('succeeded')
    expect(endState[todolistID][1].entityStatus).toBe('succeeded')
    expect(taskKeysLength).toBe(12)
})

test('CHANGE-TASKS-ENTITY-STATUS', () => {

    const newStatus = 'loading'

    const endState = tasksReducer(startState,
        changeTasksEntityStatusAC('todolistId2', '2', newStatus))

    expect(endState['todolistId1'][0].entityStatus).toBe('succeeded')
    expect(endState['todolistId1'][1].entityStatus).toBe('succeeded')
    expect(endState['todolistId2'][0].entityStatus).toBe('succeeded')
    expect(endState['todolistId2'][1].entityStatus).toBe(newStatus)
})