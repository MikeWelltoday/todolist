import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, todolistFilterReducerType, todolistReducerType,
    todolistsReducer
} from '../reducers/todolists-reducer'
import {v1} from 'uuid'
import {TodolistApiType} from '../../api'

//========================================================================================

const todolistId1 = v1()
const todolistId2 = v1()
let startState: todolistReducerType[]

beforeEach(() => {
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
})

test('REMOVE-TODOLIST', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId1)

})

test('ADD-TODOLIST', () => {

    const newTodolistFromAPI = {id: 'todolistId3', title: 'todolist from server', addedDate: '', order: 0}

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistFromAPI))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistFromAPI.title)
    expect(endState[0].filter).toBe('all')
})

test('CHANGE-TODOLIST-TITLE', () => {

    const changedTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, changedTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(changedTodolistTitle)
})

test('CHANGE-TODOLIST-FILTER', () => {

    const newFilter: todolistFilterReducerType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('SET-TODOLISTS', () => {

    const newTodolists: TodolistApiType[] = [
        {id: 'todolistId3', title: 'new todolists', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, setTodolistsAC(newTodolists))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(newTodolists[0].id)
    expect(endState[0].title).toBe(newTodolists[0].title)
    expect(endState[0].filter).toBe('all')

})