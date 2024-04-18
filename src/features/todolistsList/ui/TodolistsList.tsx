import React, { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Todolist } from 'features/todolistsList/ui/todolist/Todolist'
import { AddItemForm } from 'components'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from 'app/store'
import { todolistsSelector } from '../model/todolist/todolists-selector'
import { isLoggedSelector } from 'state/selectors/isLogged-selector'
import { todolistsThunks } from '../model/todolist/todolists-reducer'

//========================================================================================

type TodolistsListPropsType = {
	demo: boolean
}

//========================================================================================

export const TodolistsList: FC<TodolistsListPropsType> = (props) => {

	const dispatch = useAppDispatch()
	const todolists = useSelector(todolistsSelector)
	const isLogged = useSelector(isLoggedSelector)

	useEffect(() => {
		if (props.demo) return
		if (!isLogged) return
		dispatch(todolistsThunks.fetchTodolistsTC())
	}, [])

	const addTodolist = useCallback((newTodolistTitle: string) => {
		return dispatch(todolistsThunks.addTodolistTC(newTodolistTitle)).unwrap()
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
								<Paper sx={{ padding: '10px' }} elevation={3}>
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






















