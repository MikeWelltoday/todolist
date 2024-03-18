import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {TodolistsActionsType, todolistsReducer} from './reducers/todolists-reducer'
import {TasksActionsType, tasksReducer} from './reducers/tasks-reducer'
import {thunk, ThunkDispatch} from 'redux-thunk'
import {useDispatch} from 'react-redux'
import {appReducer} from './index'
import {AppActionsType} from './reducers/app-reducer'


//========================================================================================

export type AppRootStateType = ReturnType<typeof rootReducer>

//========================================================================================

type AllReducersActionsType = AppActionsType | TasksActionsType | TodolistsActionsType
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AllReducersActionsType>

export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()

//========================================================================================

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = legacy_createStore(
    rootReducer,
    undefined,
    applyMiddleware(thunk)
)

// @ts-ignore
window.store = store

