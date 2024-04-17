import { combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { todolistsReducer } from 'features/todolistsList/model/todolist/todolists-reducer'
import { tasksReducer } from 'features/todolistsList/model/task/tasks-reducer'
import { appReducer } from 'state/reducers/app-reducer'
import { authReducer } from 'state/reducers/auth-reducer'

//========================================================================================

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatchType>()

export const store = configureStore({
	reducer:
		{
			todolistsReducer,
			tasksReducer,
			appReducer,
			authReducer
		},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// @ts-ignore
window.store = store

