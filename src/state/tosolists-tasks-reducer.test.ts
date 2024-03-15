import {tasksReducer, TasksReducerType} from './taasks-reducer/tasks-reducer'
import {addTodolistAC, todolistReducerType, todolistsReducer} from './todolists-reducer/todolists-reducer'


//========================================================================================

let startStateTasks: TasksReducerType
let startStateTodolists: todolistReducerType[]

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

    const idFromTodolists = endStateTodolists[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)

    expect(idFromTasks).toBe(idFromTodolists)
})