import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from 'entities/authSlice/authSlice'
import { tasksSlice } from 'features/tasks/model/tasksSlice'
import { todolistsSlice } from 'features/todolist/model/todolistsSlice'
import { appSlice } from '../appSlice/appSlice'

//========================================================================================

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

//========================================================================================

/**
 * ⛔ STORE импортировать напрямую из файла => если через index, то будет ошибка
 */

export const store = configureStore({
	reducer:
		{
			todolistsSlice,
			tasksSlice,
			appSlice,
			authSlice
		}

	// не нужно исопльзовать, в RTK уже идет это под копотом
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// @ts-ignore
window.store = store