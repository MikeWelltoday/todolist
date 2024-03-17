import React, {FC, useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {Todolist} from '../todolist/Todolist'
import {addTodolistTC, fetchTodolistsTC, todolistsSelector, useAppDispatch} from '../../state'
import {AddItemForm} from '../../components'

//========================================================================================

type TodolistsListPropsType = {
    demo: boolean
}

//========================================================================================

export const TodolistsList: FC<TodolistsListPropsType> = (props) => {

    const dispatch = useAppDispatch()
    const todolists = useSelector(todolistsSelector)

    useEffect(() => {
        if (props.demo) return
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodolistTC(newTodolistTitle))
    }, [])

    return (
        <>

            <Grid container sx={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist} entityStatus={'succeeded'}/>
            </Grid>

            <Grid container spacing={5}>
                {todolists.map(t => {
                        return (
                            <Grid item key={t.id}>
                                <Paper sx={{padding: '10px'}} elevation={3}>
                                    <Todolist
                                        key={t.id}
                                        todolistId={t.id}
                                        title={t.title}
                                        filter={t.filter}
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






















