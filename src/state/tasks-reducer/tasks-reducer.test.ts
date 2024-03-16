import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    TasksReducerType
} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from '../todolists-reducer/todolists-reducer'
import {TaskPrioritiesEnum, TaskStatusesEnum} from '../../api/tasks-api'
import {TodolistApiType} from '../../api/todolists-api'

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
                deadline: ''
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
                deadline: ''
            }

        ],
        'todolistId2': [
            {
                todoListId: 'todolistId2',
                id: '1', title: 'Book',
                status: TaskStatusesEnum.New,
                priority: TaskPrioritiesEnum.Low,
                description: '',
                order: 0,
                completed: false,
                addedDate: '',
                startDate: '',
                deadline: ''
            },
            {
                todoListId: 'todolistId2',
                id: '2', title: 'Milk',
                status: TaskStatusesEnum.Completed,
                priority: TaskPrioritiesEnum.Low,
                description: '',
                order: 0,
                completed: false,
                addedDate: '',
                startDate: '',
                deadline: ''
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

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBe(newTaskFromAPI.id)
    expect(endState['todolistId2'][0].title).toBe(newTaskFromAPI.title)
    expect(endState['todolistId2'][0].status).toBe(TaskStatusesEnum.New)
})

test('CHANGE-TASK-STATUS', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2', TaskStatusesEnum.New))

    expect(endState['todolistId1'][1].status).toBe(TaskStatusesEnum.New)
    expect(endState['todolistId2'][1].status).toBe(TaskStatusesEnum.New)
})

test('CHANGE-TASK-TITLE', () => {
    const newTitle = 'MEAT'
    const endState = tasksReducer(startState, changeTaskTitleAC('todolistId2', '2', newTitle))
    expect(endState['todolistId1'][1].title).toBe('Redux')
    expect(endState['todolistId2'][1].title).toBe(newTitle)
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

    expect(endStateLength).toBe(5)

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

    expect(endState[todolistID].length).toBe(2)
    expect(endState[todolistID][0].id).toBe('3')
    expect(endState[todolistID][1].id).toBe('4')
    expect(endState[todolistID][0].title).toBe('From Server with id 3')
    expect(endState[todolistID][1].title).toBe('From Server with id 4')

})