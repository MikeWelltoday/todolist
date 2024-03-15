import './app/App.scss'
import {TaskType} from './layout/todolist/Todolist'

//========================================================================================

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type tasksObjType = {
    [key: string]: TaskType[]
}

//========================================================================================

// function App() {
//
//     let todolistId1 = v1()
//     let todolistId2 = v1()
//
//     const [todolists, setTodolists] = useState<TodolistType[]>([
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'}
//     ])
//
//     const [tasks, setTasks] = useState<tasksObjType>({
//         [todolistId1]:
//             [
//                 {id: v1(), title: 'HTML&CSS', isDone: true},
//                 {id: v1(), title: 'TS', isDone: true},
//                 {id: v1(), title: 'ReactJS', isDone: false},
//                 {id: v1(), title: 'Redux', isDone: false},
//                 {id: v1(), title: 'Redux', isDone: false}
//             ],
//         [todolistId2]:
//             [
//                 {id: v1(), title: 'Book', isDone: false},
//                 {id: v1(), title: 'Milk', isDone: true}
//             ]
//     })
//
//     function addTask(todolistId: string, newTaskTitle: string) {
//         setTasks({
//             ...tasks,
//             [todolistId]: [{id: v1(), title: newTaskTitle, isDone: false}, ...tasks[todolistId]]
//         })
//     }
//
//     function removeTask(todolistId: string, taskId: string) {
//         setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
//     }
//
//     function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
//         setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
//     }
//
//     function changeTaskTitle(todolistId: string, taskId: string, newTaskTitle: string) {
//         setTasks({
//             ...tasks,
//             [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTaskTitle} : t)
//         })
//     }
//
//     function changeTaskFilter(todolistId: string, filterMode: FilterValuesType) {
//         setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: filterMode} : t))
//     }
//
//     function changeTodolistTitle(todolistId: string, newTodolistTitle: string) {
//         setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: newTodolistTitle} : t))
//     }
//
//     function addTodolist(newTodolistTitle: string) {
//         const newTodolist: TodolistType = {id: v1(), title: newTodolistTitle, filter: 'all'}
//         setTodolists([newTodolist, ...todolists])
//         setTasks({...tasks, [newTodolist.id]: []})
//     }
//
//     function removeTodolist(todolistId: string) {
//         setTodolists([...todolists.filter(item => item.id !== todolistId)])
//         const copy = {...tasks}
//         delete copy[todolistId]
//         setTasks(copy)
//     }
//
//     return (
//         <div className="App">
//
//             <HeaderAppBar/>
//
//             <Container fixed>
//
//                 <Grid container sx={{padding: '20px'}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//
//                 <Grid container spacing={5}>
//                     {todolists.map(todolist => {
//                             let filteredTasks = tasks[todolist.id]
//                             if (todolist.filter === 'active') {
//                                 filteredTasks = filteredTasks.filter(item => !item.isDone)
//                             }
//                             if (todolist.filter === 'completed') {
//                                 filteredTasks = filteredTasks.filter(item => item.isDone)
//                             }
//
//                             return (
//                                 <Grid item>
//                                     <Paper sx={{padding: '10px'}} elevation={3}>
//                                         <Todolist
//                                             key={todolist.id}
//                                             todolistId={todolist.id}
//                                             todolistTitle={todolist.title}
//                                             filteredTasks={filteredTasks}
//                                             filter={todolist.filter}
//                                             addTask={addTask}
//                                             removeTask={removeTask}
//                                             changeTaskFilter={changeTaskFilter}
//                                             changeTaskStatus={changeTaskStatus}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodolistTitle={changeTodolistTitle}
//                                             removeTodolist={removeTodolist}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         }
//                     )}
//                 </Grid>
//
//             </Container>
//
//         </div>
//     )
// }
//
// export default App