import React from 'react'
import {Provider} from 'react-redux'
import {AppRootStateType} from '../../state/store'
import {combineReducers, legacy_createStore} from 'redux'
import {tasksReducer} from '../../state/taasks-reducer/tasks-reducer'
import {todolistsReducer} from '../../state/todolists-reducer/todolists-reducer'
import {v1} from 'uuid'
import {TaskPrioritiesEnum, TaskStatusesEnum} from '../../api/tasks-api'

//========================================================================================

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


const initialGlobalState: AppRootStateType = {
    todolists:
        [
            {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
            {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
        ],
    tasks:
        {
            'todolistId1':
                [
                    {
                        todoListId: 'todolistId1',
                        id: v1(),
                        title: 'React',
                        status: TaskStatusesEnum.Completed,
                        priority: TaskPrioritiesEnum.Low,
                        description: '',
                        order: 0,
                        completed: false,
                        addedDate: '',
                        startDate: '',
                        deadline: ''
                    },
                    {
                        todoListId: 'todolistId1',
                        id: v1(),
                        title: 'Redux',
                        status: TaskStatusesEnum.New,
                        priority: TaskPrioritiesEnum.Low,
                        description: '',
                        order: 0,
                        completed: false,
                        addedDate: '',
                        startDate: '',
                        deadline: ''
                    }

                ],
            'todolistId2':
                [
                    {
                        todoListId: 'todolistId2',
                        id: v1(), title: 'Book',
                        status: TaskStatusesEnum.New,
                        priority: TaskPrioritiesEnum.Low,
                        description: '',
                        order: 0,
                        completed: false,
                        addedDate: '',
                        startDate: '',
                        deadline: ''
                    },
                    {
                        todoListId: 'todolistId2',
                        id: v1(), title: 'Milk',
                        status: TaskStatusesEnum.Completed,
                        priority: TaskPrioritiesEnum.Low,
                        description: '',
                        order: 0,
                        completed: false,
                        addedDate: '',
                        startDate: '',
                        deadline: ''
                    }
                ]
        }
}

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, undefined)

//========================================================================================

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {

    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
}