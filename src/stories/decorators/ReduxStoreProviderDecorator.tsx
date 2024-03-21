import React from 'react'
import {Provider} from 'react-redux'
import {thunk} from 'redux-thunk'
import {appReducer, AppRootStateType, tasksReducer, todolistsReducer} from '../../state'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {TaskPrioritiesEnum, TaskStatusesEnum} from '../../api'

//========================================================================================

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})


const initialGlobalState: AppRootStateType = {
    todolists:
        [
            {
                id: 'todolistId1',
                title: 'What to learn',
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: 'succeeded'
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
    tasks:
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
                        entityStatus: 'succeeded'
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
                        entityStatus: 'succeeded'
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
                        entityStatus: 'succeeded'
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
                        entityStatus: 'succeeded'
                    }
                ]
        },
    app: {
        status: 'idle',
        error: null
    }
}

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType,
    applyMiddleware(thunk))

//========================================================================================

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {

    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
}