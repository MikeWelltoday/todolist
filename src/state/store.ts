import {Action, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {todolistsInitialState, todolistsReducer} from './todolists-reducer/todolists-reducer'
import {tasksInitialState, tasksReducer} from './tasks-reducer/tasks-reducer'
import {thunk, ThunkDispatch} from 'redux-thunk'
import {useDispatch} from 'react-redux'

//========================================================================================

export type AppRootStateType = ReturnType<typeof rootReducer>

//========================================================================================

export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, Action>

export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()

//========================================================================================

export const storeInitialState: AppRootStateType = {
    todolists: todolistsInitialState,
    tasks: tasksInitialState
}

//========================================================================================

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(
    rootReducer,
    undefined,
    applyMiddleware(thunk)
)

// @ts-ignore
window.store = store

