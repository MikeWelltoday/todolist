import React from 'react'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'
import { HashRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer, authReducer, tasksReducer, todolistsReducer } from 'state'
import { combineReducers } from 'redux'
import { TaskPrioritiesEnum, TaskStatusesEnum } from 'api'
import { AppRootStateType } from 'app/store'

//========================================================================================

const rootReducer = combineReducers({
	tasksReducer,
	todolistsReducer,
	appReducer,
	authReducer
})


const initialGlobalState: AppRootStateType = {
	todolistsReducer:
		[
			{
				id: 'todolistId1',
				title: 'What to learn',
				filter: 'all',
				addedDate: '',
				order: 0,
				entityStatus: 'idle'
			},
			{
				id: 'todolistId2',
				title: 'What to buy',
				filter: 'all',
				addedDate: '',
				order: 0,
				entityStatus: 'loading'
			}
		],
	tasksReducer:
		{
			'todolistId1':
				[
					{
						todoListId: 'todolistId1',
						id: 'hfaspdfaiufg',
						title: 'React',
						status: TaskStatusesEnum.Completed,
						priority: TaskPrioritiesEnum.Low,
						description: '',
						order: 0,
						completed: false,
						addedDate: '',
						startDate: '',
						deadline: '',
						entityStatus: 'idle'
					},
					{
						todoListId: 'todolistId1',
						id: 'bjgwmfwf',
						title: 'Redux',
						status: TaskStatusesEnum.New,
						priority: TaskPrioritiesEnum.Low,
						description: '',
						order: 0,
						completed: false,
						addedDate: '',
						startDate: '',
						deadline: '',
						entityStatus: 'idle'
					}

				],
			'todolistId2':
				[
					{
						todoListId: 'todolistId2',
						id: 'rkml;qwemq',
						title: 'BookS',
						status: TaskStatusesEnum.New,
						priority: TaskPrioritiesEnum.Low,
						description: '',
						order: 0,
						completed: false,
						addedDate: '',
						startDate: '',
						deadline: '',
						entityStatus: 'idle'
					},
					{
						todoListId: 'todolistId2',
						id: 'qmwnbcvbciz',
						title: 'Milk',
						status: TaskStatusesEnum.Completed,
						priority: TaskPrioritiesEnum.Low,
						description: '',
						order: 0,
						completed: false,
						addedDate: '',
						startDate: '',
						deadline: '',
						entityStatus: 'idle'
					}
				]
		},
	appReducer: {
		status: 'idle',
		error: null,
		isAppInitialized: true
	},
	authReducer: {
		isLogged: true
	}
}

export const storyBookStore = configureStore({
	reducer: rootReducer,
	preloadedState: initialGlobalState as AppRootStateType,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


//========================================================================================

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
	return (
		<Provider store={storyBookStore}>
			{storyFn()}
		</Provider>

		// <MemoryRouter initialEntries={['/']} initialIndex={0}>
		// <Provider store={storyBookStore}>
		// 	{storyFn()}
		// </Provider>
		// </MemoryRouter>
	)
}

export const BrowserRouterDecorator = (storyFn: () => React.ReactNode) => {
	return (
		<HashRouter>
			{storyFn()}
		</HashRouter>
	)
}


