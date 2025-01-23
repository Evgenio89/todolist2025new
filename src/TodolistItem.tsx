import {filterValueType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent,  useState} from "react";

type TodolistItemType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: filterValueType) => void
    addTask: (title: string) => void
}


export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 addTask,
                             }: TodolistItemType) => {

    const [taskTitle, setTaskTitle] = useState('')


    const addTaskButtonHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const changeTaskTitleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const changeTaskTitleInputOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskButtonHandler()
        }
    }



    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={changeTaskTitleInputHandler}
                onKeyDown={changeTaskTitleInputOnEnterHandler}
                />
                <Button title={'+'} onClick={addTaskButtonHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskButtonHandler = () => {
                            deleteTask(task.id)
                        }

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={deleteTaskButtonHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => {
                    changeFilter('all')
                }}/>
                <Button title={'Active'} onClick={() => {
                    changeFilter('active')
                }}/>
                <Button title={'Completed'} onClick={() => {
                    changeFilter('completed')
                }}/>
            </div>
        </div>
    )
}