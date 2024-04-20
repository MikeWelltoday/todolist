import React, { FC, memo, useCallback } from 'react'
import S from './TodolistButtons.module.scss'
import { TodolistFilterReducerType, todolistsActions } from '../todolist/model/todolistsSlice'
import { CustomButton } from '../../shared'
import { useAppDispatch } from '../../store/store'

type TodolistButtonsPropsType = {
	todolistId: string
	todolistFilter: TodolistFilterReducerType
}

export const TodolistButtons: FC<TodolistButtonsPropsType> = memo((props) => {

	// console.log('🟣🟣🟣 => TodolistButtons')

	const dispatch = useAppDispatch()

	const changeFilterHandlerAll = useCallback(() => {
		dispatch(todolistsActions.changeTodolistFilter({ todolistId: props.todolistId, filter: 'all' }))
	}, [props.todolistId])

	const changeFilterHandlerActive = useCallback(() => {
		dispatch(todolistsActions.changeTodolistFilter({ todolistId: props.todolistId, filter: 'active' }))
	}, [props.todolistId])

	const changeFilterHandlerComplete = useCallback(() => {
		dispatch(todolistsActions.changeTodolistFilter({ todolistId: props.todolistId, filter: 'completed' }))
	}, [props.todolistId])

	return (
		<div className={S.todolistButtons}>
			<CustomButton
				title={'All'}
				color={'inherit'}
				variant={props.todolistFilter === 'all' ? 'outlined' : 'text'}
				onClick={changeFilterHandlerAll}
			/>
			<CustomButton
				title={'Active'}
				color={'success'}
				variant={props.todolistFilter === 'active' ? 'outlined' : 'text'}
				onClick={changeFilterHandlerActive}
			/>
			<CustomButton
				title={'Completed'}
				color={'secondary'}
				variant={props.todolistFilter === 'completed' ? 'outlined' : 'text'}
				onClick={changeFilterHandlerComplete}
			/>
		</div>
	)
})
