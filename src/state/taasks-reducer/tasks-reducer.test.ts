import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksReducerType
} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC} from '../todolists-reducer/todolists-reducer'
import {TaskPrioritiesEnum, TaskStatusesEnum} from '../../api/tasks-api'

//========================================================================================

let startState: TasksReducerType

beforeEach(() => {
    startState = {
        'todolistId1':
            [
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
        'todolistId2':
            [
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

    const newTaskTitle = 'meat'

    const endState = tasksReducer(startState, addTaskAC('todolistId2', newTaskTitle))

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe(newTaskTitle)
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

    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})

test('REMOVE-TODOLIST', () => {

    const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()

})