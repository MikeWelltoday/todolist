import {tasksObjType} from '../App'
import {removeTasktAC, tasksReducer} from './tasks-reducer'

//========================================================================================

test('correct task should be removed from correct array', () => {

    const startState: tasksObjType = {
        'todolistId1':
            [
                {id: '1', title: 'CSS', isDone: false},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false}
            ],
        'todolistId2':
            [
                {id: '1', title: 'bread', isDone: false},
                {id: '2', title: 'milk', isDone: true},
                {id: '3', title: 'tea', isDone: false}
            ]
    }

    const endState = tasksReducer(startState, removeTasktAC('todolistId2', '2'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
    
})