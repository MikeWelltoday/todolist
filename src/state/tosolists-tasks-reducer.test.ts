import {tasksReducer} from './tasks-reducer'
import {addTodolistAC, todolistsReducer} from './todolists-reducer'
import {tasksObjType, TodolistType} from '../App'


//========================================================================================

let startStateTasks: tasksObjType
let startStateTodolists: TodolistType[]

beforeEach(() => {
    startStateTasks = {}
    startStateTodolists = []
})

test('id should be equal', () => {

    const action = addTodolistAC('new todolist')

    const endStateTasks = tasksReducer(startStateTasks, action)
    const endStateTodolists = todolistsReducer(startStateTodolists, action)

    const keys = Object.keys(endStateTasks)
    const idFromTasks = keys[0]
    
    const ifFromTodolists = endStateTodolists[0].id

    expect(idFromTasks).toBe(action.id)
    expect(ifFromTodolists).toBe(action.id)
})