import {combineReducers, createStore} from 'redux'
import {todolistsReducer} from './todolists-reducer/todolists-reducer'
import {tasksReducer} from './taasks-reducer/tasks-reducer'

//========================================================================================

export type AppRootStateType = ReturnType<typeof rootReducer>

//========================================================================================

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

