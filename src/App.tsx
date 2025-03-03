import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";


export type Todolist = {
    id: string
    title: string
    filter: filterValueType
}


/*первый коммит*/
export type TaskType ={
    id:   string
    title: string
    isDone: boolean
}
export type filterValueType = 'all' | 'active' | 'completed'

export type TasksState = {
    [key: string]: TaskType[]
}


export const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>(
        [
            { id: todolistId1, title: 'What to learn', filter: 'all' },
            { id: todolistId2, title: 'What to buy', filter: 'all' },
        ]
    )

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })



    const changeFilter = (todolistId: string, filter: filterValueType) => {
        setTodolists(todolists.map(todo => todo.id === todolistId? {...todo, filter} : todo))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, title} : todo))
    }







    const  deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId] : tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const addItem = (todolistId: string, title: string) => {
            const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId] : [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatusValue: boolean) => {
        setTasks({...tasks, [todolistId] : tasks[todolistId].map(task => task.id === taskId? {...task, isDone: newStatusValue} : task)})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId] : tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }


    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todo => todo.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks })
    }

    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: Todolist = {
            id: todolistId,
            title: title,
            filter: 'all',
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    return (
      <div className="app">
          <CreateItemForm onCreateItem={createTodolist}/>
          {todolists.map((todolist) => {
              const todolistTasks = tasks[todolist.id]
              let filteredTasks = todolistTasks
              if (todolist.filter === 'active') {
                  filteredTasks = todolistTasks.filter(task => !task.isDone)
              }
              if (todolist.filter === 'completed') {
                  filteredTasks = todolistTasks.filter(task => task.isDone)
              }

              return(
                  <TodolistItem
                      todolist={todolist}
                      key={todolist.id}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      addTask={addItem}
                      changeTaskStatus={changeTaskStatus}
                      deleteTodolist={deleteTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                  />
              )
          })}

      </div>
  )
}


