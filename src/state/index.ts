//========================================================================================
// APP-REDUCER
export type { AppErrorType } from './reducers/app-reducer'
export type { AppReducerType } from './reducers/app-reducer'
export { appReducer } from './reducers/app-reducer'
export { appActions } from './reducers/app-reducer'


//========================================================================================
// TASKS-REDUCER
export type { UiUpdateTaskModelType } from './reducers/tasks-reducer'
export type { TaskType } from './reducers/tasks-reducer'
export type { TasksReducerType } from './reducers/tasks-reducer'
export { tasksReducer } from './reducers/tasks-reducer'
export { tasksActions } from './reducers/tasks-reducer'
export { tasksThunks } from './reducers/tasks-reducer'


export { removeTaskTC } from './reducers/tasks-reducer'


//========================================================================================
// TODOLISTS-REDUCER
export type { TodolistFilterReducerType } from './reducers/todolists-reducer'
export type { RequestStatusType } from './reducers/todolists-reducer'
export type { TodolistReducerType } from './reducers/todolists-reducer'

export { todolistsReducer } from './reducers/todolists-reducer'
export { todolistsActions } from './reducers/todolists-reducer'

export { fetchTodolistsTC } from './reducers/todolists-reducer'
export { addTodolistTC } from './reducers/todolists-reducer'
export { removeTodolistTC } from './reducers/todolists-reducer'
export { updateTodolistTitleTC } from './reducers/todolists-reducer'


//========================================================================================
// AUTH-REDUCER

export type { AuthReducerType } from './reducers/auth-reducer'
export { authReducer } from './reducers/auth-reducer'

export { authSetLoggedTC } from './reducers/auth-reducer'
export { authIsInitializedTC } from './reducers/auth-reducer'
export { authLogoutTC } from './reducers/auth-reducer'

//========================================================================================
// SELECTORS
export { appErrorSelector } from 'state/selectors/appError-selector'


export { todolistsSelector } from './selectors/todolists-selector'
export { appStatusSelector } from 'state/selectors/appStatus-selector'
export { isLoggedSelector } from './selectors/isLogged-selector'
export { isAppInitializedSelector } from 'state/selectors/isAppInitialized-selector'

//========================================================================================
// STORE
export type { AppRootStateType } from 'app/store'
export { useAppDispatch } from 'app/store'
export { store } from 'app/store'
