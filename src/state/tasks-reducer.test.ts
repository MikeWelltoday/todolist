import {tasksObjType} from '../App'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {addTodolistAC} from './todolists-reducer'

//========================================================================================

let startState: tasksObjType

beforeEach(() => {
    startState = {
        'todolistId1':
            [
                {id: '1', title: 'CSS', isDone: false},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false}
            ],
        'todolistId2':
            [
                {id: '1', title: 'bread', isDone: false},
                {id: '2', title: 'milk', isDone: true},
                {id: '3', title: 'tea', isDone: false}
            ]
    }
})

test('correct task should be removed from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added from correct array', () => {

    const newTaskTitle = 'meat'

    const endState = tasksReducer(startState, addTaskAC('todolistId2', newTaskTitle))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe(newTaskTitle)
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2', false))

    expect(endState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId2'][1].isDone).toBe(false)
})

test('title of specified task should change its name', () => {

    const newTitle = 'MEAT'


    const endState = tasksReducer(startState, changeTaskTitleAC('todolistId2', '2', newTitle))

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe(newTitle)
})

test('123', () => {

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})