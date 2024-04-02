import { combineReducers } from 'redux'
import { thunk, ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import {
	AppActionsType,
	appReducer,
	AuthActionsType,
	authReducer,
	TasksActionsType,
	tasksReducer,
	TodolistsActionsType,
	todolistsReducer
} from 'state'
import { configureStore } from '@reduxjs/toolkit'

//========================================================================================

// export type AppRootStateType = ReturnType<typeof rootReducer>

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

// export const store = legacy_createStore(
// 	rootReducer,
// 	undefined,
// 	applyMiddleware(thunk)
// )

//========================================================================================

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// @ts-ignore
window.store = store

