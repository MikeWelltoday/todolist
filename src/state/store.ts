import { combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer, authReducer, tasksReducer, todolistsReducer } from 'state/index'

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

