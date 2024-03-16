import React, {FC, useCallback, useEffect} from 'react'
import {AppRootStateType, useAppDispatch} from '../../state/store'
import {useSelector} from 'react-redux'
import {addTodolistTC, fetchTodolistsTC, todolistReducerType} from '../../state/todolists-reducer/todolists-reducer'
import Grid from '@mui/material/Grid'
import {AddItemForm} from '../../components/addItemForm/AddItemForm'
import Paper from '@mui/material/Paper'
import {Todolist} from '../todolist/Todolist'


//========================================================================================


export const TodolistsList: FC = () => {

    const dispatch = useAppDispatch()

    const todolists = useSelector<AppRootStateType, todolistReducerType[]>(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodolistTC(newTodolistTitle))
    }, [])

    return (
        <>

            <Grid container sx={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
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






















