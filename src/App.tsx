import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";





/*первый коммит*/
export type TaskType ={
    id:   string
    title: string
    isDone: boolean
}
export type filterValueType = 'all' | 'active' | 'completed'

export const App = () => {
    let [tasks, setTasks] = useState<TaskType[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Book', isDone: true },
        { id: v1(), title: 'Smile', isDone: false },
    ])
    const [filter, setFilter] = useState<filterValueType>('all')


    const changeFilter = (filter: filterValueType) => {
        setFilter(filter)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }


    const  deleteTask = (taskId: string) => {
        const filteredTask = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTask)
    }

    const addTask = (title: string) => {
            const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newStatusValue: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: newStatusValue} : task))
    }

  return (
      <div className="app">
        <TodolistItem title={'What to learn'}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
        />
      </div>
  )
}


