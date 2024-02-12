import {FilterValuesType, tasksObjType, TodolistType} from '../App'
import {v1} from 'uuid'

//========================================================================================
//TYPES

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

//========================================================================================
// TYPES ALL TOGETHER

export type ActionsType = RemoveTaskActionType


//========================================================================================
// REDUCER

export const tasksReducer = (state: tasksObjType, action: ActionsType): tasksObjType => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }


        default:
            return state
    }
}

//========================================================================================
// ACTION-CREATER

export function removeTasktAC(todolistId: string, taskId: string): RemoveTaskActionType {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}


//========================================================================================