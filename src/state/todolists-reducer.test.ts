import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'
import {FilterValuesType, TodolistType} from '../App'

//========================================================================================


test('correct todolist should be removed', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId1)

})

test('correct todolist should be added', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')

})

test('correct todolist should change its name', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const changedTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, changedTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(changedTodolistTitle)

})

test('correct filter of todolist should be changed', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const newFilter: FilterValuesType = 'completed'

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)

})