import React from 'react'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { TaskPrioritiesEnum, TaskStatusesEnum } from 'shared'
import { AppRootState } from '../store/store'
import { tasksSlice } from 'features/tasks/model/tasksSlice'
import { todolistsSlice } from 'features/todolist/model/todolistsSlice'
import { appSlice } from '../appSlice/appSlice'
import { authSlice } from 'entities/authSlice/authSlice'

//========================================================================================

const initialGlobalState: AppRootState = {
	todolistsSlice:
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
	tasksSlice:
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
	appSlice: {
		status: 'idle',
		error: null,
		isAppInitialized: true
	},
	authSlice: {
		isLogged: true,
		captchaUrl: null
	}
}

/**
 * ⛔ storyBookStore импортировать напрямую из файла => если черещ index, то будет ошибка
 */
const storyBookStore = configureStore({
	reducer: {
		todolistsSlice,
		tasksSlice,
		appSlice,
		authSlice
	},
	preloadedState: initialGlobalState as AppRootState,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

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




