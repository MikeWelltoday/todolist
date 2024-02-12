import {
    ActionsType,
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType, ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'
import {FilterValuesType, TodolistType} from '../App'


test('correct todolist should be removed', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId2))

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

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

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

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, changedTodolistTitle))

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


    const actions = {
        // тип 'CHANGE-TODOLIST-FILTER' будет восприниматься в
        // reducer как строка, поэтому нужно добавить 'as const'
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    }

    const actionsORlikeTHIS = {
        // тип 'CHANGE-TODOLIST-FILTER' будет восприниматься в
        // reducer как строка, поэтому нужно типизировать actionsORlikeTHIS
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)

})