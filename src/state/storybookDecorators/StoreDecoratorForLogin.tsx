import React from 'react'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { AppRootStateType } from '../store/store'
import { tasksSlice } from '../../features/tasks/model/tasksSlice'
import { todolistsSlice } from '../../features/todolist/model/todolistsSlice'
import { appSlice } from '../appSlice/appSlice'
import { authSlice } from '../../entities/authSlice/authSlice'

const initialGlobalState: AppRootStateType = {
	todolistsSlice: [],
	tasksSlice: {},
	appSlice: {
		status: 'idle',
		error: null,
		isAppInitialized: true
	},
	authSlice: {
		isLogged: false,
		captchaUrl: null
	}
}

const storyBookStore = configureStore({
	reducer: {
		todolistsSlice,
		tasksSlice,
		appSlice,
		authSlice
	},
	preloadedState: initialGlobalState as AppRootStateType,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export const StoreDecoratorForLogin = (storyFn: () => React.ReactNode) => {
	return (
		<Provider store={storyBookStore}>
			{storyFn()}
		</Provider>
	)
}
