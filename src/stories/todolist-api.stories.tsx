import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api'

//========================================================================================

export default {
    title: 'API/API'
}

//========================================================================================

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist().then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('🍌').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist('81ffd405-8d1c-4d41-97c1-116598478335').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist('47fa525b-159e-4332-ac0b-bf5b4b8c7e59', '🍌').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}