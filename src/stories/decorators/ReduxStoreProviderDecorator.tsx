import React from 'react'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'
import { HashRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { AppRootStateType } from 'app/store'
import { tasksReducer } from 'features/todolistsList/model/task/tasks-reducer'
import { todolistsReducer } from 'features/todolistsList/model/todolist/todolists-reducer'
import { appReducer } from 'state/reducers/app-reducer'
import { authReducer } from 'state/reducers/auth-reducer'
import { TaskPrioritiesEnum, TaskStatusesEnum } from 'features/todolistsList/api/tasks-api'

//========================================================================================

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
	reducer: {
		tasksReducer,
		todolistsReducer,
		appReducer,
		authReducer
	},
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


