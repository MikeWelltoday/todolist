import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistFilterReducerType,
    TodolistReducerType,
    todolistsReducer
} from '../../state'
import {TodolistApiType} from '../../api'

//========================================================================================


let startState: TodolistReducerType[]

beforeEach(() => {
    startState = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'succeeded'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'succeeded'}
    ]
})

test('REMOVE-TODOLIST', () => {

    const endState = todolistsReducer(startState, removeTodolistAC('todolistId2'))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('todolistId1')

})

test('ADD-TODOLIST', () => {

    const newTodolistFromAPI = {id: 'todolistId3', title: 'todolist from server', addedDate: '', order: 0}

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistFromAPI))

    const keys = Object.keys(endState[0])

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistFromAPI.title)
    expect(endState[0].filter).toBe('all')
    expect(endState[0].entityStatus).toBe('succeeded')
    expect(keys.length).toBe(6)
})

test('CHANGE-TODOLIST-TITLE', () => {

    const changedTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, changeTodolistTitleAC('todolistId2', changedTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(changedTodolistTitle)
})

test('CHANGE-TODOLIST-FILTER', () => {

    const newFilter: TodolistFilterReducerType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC('todolistId2', newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('SET-TODOLISTS', () => {

    const newTodolists: TodolistApiType[] = [
        {id: 'todolistId3', title: 'new todolists', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, setTodolistsAC(newTodolists))

    const keys = Object.keys(endState[0])

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(newTodolists[0].id)
    expect(endState[0].title).toBe(newTodolists[0].title)
    expect(endState[0].filter).toBe('all')
    expect(endState[0].entityStatus).toBe('succeeded')
    expect(keys.length).toBe(6)
})

test('CHANGE-TODOLIST-ENTITY-STATUS', () => {

    const newEntityStatus = 'loading'

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC('todolistId2', newEntityStatus))

    expect(endState[0].entityStatus).toBe('succeeded')
    expect(endState[1].entityStatus).toBe(newEntityStatus)
})