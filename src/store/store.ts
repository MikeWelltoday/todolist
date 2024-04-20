import { thunk } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from 'store/appSlice/appSlice'
import { authSlice } from 'entities/authSlice/authSlice'
import { tasksSlice, todolistsSlice } from '../features'


export const store = configureStore({
	reducer:
		{
			todolistsSlice,
			tasksSlice,
			appSlice,
			authSlice
		},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()


// @ts-ignore
window.store = store

