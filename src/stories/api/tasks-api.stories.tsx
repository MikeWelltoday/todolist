import React, {useEffect, useState} from 'react'
import {tasksAPI} from '../../api/tasks-api'

//========================================================================================

export default {
    title: 'API/tasks'
}

//========================================================================================

const todolistID = '47fa525b-159e-4332-ac0b-bf5b4b8c7e59'
const taskToDeleteID = '83bb6b51-efcf-4fa4-9ef5-af8c493a529f'
const taskToUpdateTitleID = '8970e85c-7ba2-4ed9-9674-a2b555fb8b9f'

export const GetTTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        tasksAPI.getTasks(todolistID).then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        tasksAPI.createTask(todolistID, '🍌').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        tasksAPI.deleteTask(todolistID, taskToDeleteID).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        tasksAPI.updateTaskTitle(todolistID, taskToUpdateTitleID, '🥝').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}