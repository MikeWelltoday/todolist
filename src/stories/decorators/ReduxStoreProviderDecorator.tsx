import React from 'react'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'
import { appReducer, AppRootStateType, authReducer, tasksReducer, todolistsReducer } from 'state'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { TaskPrioritiesEnum, TaskStatusesEnum } from 'api'
import { BrowserRouter } from 'react-router-dom'

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
			status: true,
			error: null,
			isAppInitialized: false
	 },
	 authReducer: {
			isLogged: false
	 }
}

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType,
		applyMiddleware(thunk))

//========================================================================================

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {

	 return (
			 <BrowserRouter>
					<Provider store={storyBookStore}>
						 {storyFn()}
					</Provider>
			 </BrowserRouter>
	 )
}