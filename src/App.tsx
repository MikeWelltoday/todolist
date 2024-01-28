import React, {useState} from 'react'
import './App.scss'
import {TasksType, Todolist} from './components/todoList/Todolist'
import {v1} from 'uuid'
import {AddItemForm} from './components/addItemForm/AddItemForm'

//========================================================================================

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type tasksObjType = {
    [key: string]: TasksType[]
}

//========================================================================================

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolistsArr, setTodolistsArr] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasksObj, setTasksObj] = useState<tasksObjType>({
        [todolistId1]:
            [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'TS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},
                {id: v1(), title: 'Redux', isDone: false}
            ],
        [todolistId2]:
            [
                {id: v1(), title: 'Book', isDone: false},
                {id: v1(), title: 'Milk', isDone: true}
            ]
    })

    function addTask(todolistId: string, newTaskTitle: string) {
        setTasksObj({
            ...tasksObj,
            [todolistId]: [{id: v1(), title: newTaskTitle, isDone: false}, ...tasksObj[todolistId]]
        })
    }

    function removeTask(todolistId: string, taskId: string) {
        setTasksObj({...tasksObj, [todolistId]: tasksObj[todolistId].filter(t => t.id !== taskId)})
    }

    function changeTaskFilter(todolistId: string, filterMode: FilterValuesType) {
        setTodolistsArr(todolistsArr.map(t => t.id === todolistId ? {...t, filter: filterMode} : t))
    }

    function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasksObj({...tasksObj, [todolistId]: tasksObj[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTaskTitle: string) {
        setTasksObj({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(t => t.id === taskId ? {...t, title: newTaskTitle} : t)
        })
    }

    function changeTodolistTitle(todolistId: string, newTodolistTitle: string) {
        setTodolistsArr(todolistsArr.map(t => t.id === todolistId ? {...t, title: newTodolistTitle} : t))
    }

    function addTodolist(newTodolistTitle: string) {
        const newTodolist: TodolistType = {id: v1(), title: newTodolistTitle, filter: 'all'}
        setTodolistsArr([newTodolist, ...todolistsArr])
        setTasksObj({...tasksObj, [newTodolist.id]: []})
    }

    function removeTodolist(todolistId: string) {
        setTodolistsArr([...todolistsArr.filter(item => item.id !== todolistId)])
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    return (
        <div className="App">

            <AddItemForm addItem={addTodolist}/>

            {todolistsArr.map(todolist => {
                    let filteredTasks = tasksObj[todolist.id]
                    if (todolist.filter === 'active') filteredTasks = filteredTasks.filter(item => !item.isDone)
                    if (todolist.filter === 'completed') filteredTasks = filteredTasks.filter(item => item.isDone)

                    return (
                        <Todolist key={todolist.id}
                                  todolistId={todolist.id}
                                  todolistTitle={todolist.title}
                                  filteredTasks={filteredTasks}
                                  filter={todolist.filter}
                                  addTask={addTask}
                                  removeTask={removeTask}
                                  changeTaskFilter={changeTaskFilter}
                                  changeTaskStatus={changeTaskStatus}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodolistTitle={changeTodolistTitle}
                                  removeTodolist={removeTodolist}

                        />
                    )
                }
            )}

        </div>
    )
}

export default App