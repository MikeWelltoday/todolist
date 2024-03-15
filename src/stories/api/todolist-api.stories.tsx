import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../../api/todolists-api'

//========================================================================================

export default {
    title: 'API/todolists'
}

//========================================================================================

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolist().then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('🍌').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.deleteTodolist('6216df54-3497-49b7-b06b-1d2ac0b07503').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTodolist('47fa525b-159e-4332-ac0b-bf5b4b8c7e59', '🍌').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}