import {
    addTodolistAC, TodolistReducerType, todolistsReducer,
    tasksReducer, TasksReducerType
} from '../../state'


//========================================================================================

let startStateTasks: TasksReducerType
let startStateTodolists: TodolistReducerType[]

beforeEach(() => {
    startStateTasks = {}
    startStateTodolists = []
})

test('id should be equal', () => {

    const newTodolistFromAPI = {id: 'todolistId3', title: 'todolist from server', addedDate: '', order: 0}

    const action = addTodolistAC(newTodolistFromAPI)

    const endStateTasks = tasksReducer(startStateTasks, action)
    const endStateTodolists = todolistsReducer(startStateTodolists, action)

    const keys = Object.keys(endStateTasks)
    const idFromTasks = keys[0]

    const idFromTodolists = endStateTodolists[0].id

    expect(idFromTasks).toBe(action.payload.newTodolistFromAPI.id)
    expect(idFromTodolists).toBe(action.payload.newTodolistFromAPI.id)

    expect(idFromTasks).toBe(idFromTodolists)
})