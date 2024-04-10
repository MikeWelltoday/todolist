import { combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { todolistsReducer } from 'state/reducers/todolists-reducer'
import { tasksReducer } from 'state/reducers/tasks-reducer'
import { appReducer } from 'state/reducers/app-reducer'
import { authReducer } from 'state/reducers/auth-reducer'

//========================================================================================

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

//========================================================================================


export const useAppDispatch = () => useDispatch<AppDispatchType>()

const rootReducer = combineReducers({
	todolistsReducer,
	tasksReducer,
	appReducer,
	authReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// @ts-ignore
window.store = store

