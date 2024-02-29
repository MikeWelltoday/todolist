import {combineReducers, createStore} from 'redux'
import {todolistsReducer} from './todolists-reducer/todolists-reducer'
import {tasksReducer} from './taasks-reducer/tasks-reducer'

//========================================================================================
// 🎲 .T.Y.P.E.S.

export type AppRootStateType = ReturnType<typeof rootReducer>

//========================================================================================
// 💾 .S.T.O.R.E.

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

