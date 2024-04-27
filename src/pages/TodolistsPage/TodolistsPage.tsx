import React, { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Navigate } from 'react-router-dom'
import { Todolist, todolistsSelector } from '../../features'
import { AddItemForm, useAppDispatch } from '../../shared'
import { isLoggedSelector } from '../../entities'
import { todolistsActions } from '../../features/todolist/model/todolistsSlice'
import { paperSx } from './TodolistsPage.styles'


type TodolistsListPropsType = {
	demo: boolean
}

export const TodolistsPage: FC<TodolistsListPropsType> = (props) => {

	const dispatch = useAppDispatch()
	const todolists = useSelector(todolistsSelector)
	const isLogged = useSelector(isLoggedSelector)

	useEffect(() => {
		if (props.demo) return
		if (!isLogged) return
		dispatch(todolistsActions.fetchTodolistsThunk())
	}, [])

	const addTodolist = useCallback((newTodolistTitle: string) => {
		return dispatch(todolistsActions.addTodolistThunk(newTodolistTitle)).unwrap()
	}, [])

	if (!isLogged) return <Navigate to={'/login'} />

	return (
		<>
			<Grid container sx={{ padding: '20px' }}>
				<AddItemForm addItem={addTodolist} />
			</Grid>

			<Grid container spacing={5}>
				{todolists.map(t => {
						return (
							<Grid item key={t.id}>
								<Paper elevation={3} sx={paperSx}>
									<Todolist
										key={t.id}
										todolistId={t.id}
										title={t.title}
										todolistFilter={t.filter}
										entityStatus={t.entityStatus}

										demo={props.demo}
									/>
								</Paper>
							</Grid>
						)
					}
				)}
			</Grid>

		</>
	)
}






















