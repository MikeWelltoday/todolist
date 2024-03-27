import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {thunk, ThunkDispatch} from 'redux-thunk'
import {useDispatch} from 'react-redux'
import {
    appReducer, AuthActionsType, authReducer, TasksActionsType, tasksReducer, TodolistsActionsType,
    todolistsReducer, AppActionsType
} from './index'

//========================================================================================

export type AppRootStateType = ReturnType<typeof rootReducer>

//========================================================================================

type AllReducersActionsType = AppActionsType | TasksActionsType | TodolistsActionsType | AuthActionsType
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AllReducersActionsType>

export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()

//========================================================================================

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = legacy_createStore(
    rootReducer,
    undefined,
    applyMiddleware(thunk)
)

// @ts-ignore
window.store = store

