import {filterValueType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";

type TodolistItemType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: number) => void
    changeFilter: (filter: filterValueType) => void
}


export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter
                             }: TodolistItemType) => {


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={() => {
                                    deleteTask(task.id)
                                }}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => {changeFilter('all')}}/>
                <Button title={'Active'} onClick={() => {changeFilter('active')}}/>
                <Button title={'Completed'} onClick={() => {changeFilter('completed')}}/>
            </div>
        </div>
    )
}