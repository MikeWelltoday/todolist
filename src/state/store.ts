import {combineReducers, legacy_createStore} from 'redux'
import {todolistsReducer} from './todolists-reducer/todolists-reducer'
import {tasksReducer} from './taasks-reducer/tasks-reducer'

//========================================================================================

export type AppRootStateType = ReturnType<typeof rootReducer>

//========================================================================================

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store

