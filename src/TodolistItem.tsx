import {filterValueType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistItemType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: filterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newStatusValue: boolean) => void
    filter: filterValueType
}


export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 addTask,
                                 changeTaskStatus,
                                 filter,
                             }: TodolistItemType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskButtonHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            addTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }

    }
    const changeTaskTitleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
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
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleInputHandler}
                    onKeyDown={changeTaskTitleInputOnEnterHandler}
                />
                <Button title={'+'} onClick={addTaskButtonHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskButtonHandler = () => {
                            deleteTask(task.id)
                        }
                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(task.id, event.currentTarget.checked)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={deleteTaskButtonHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    title={'All'} onClick={() => {
                    changeFilter('all')
                }}/>
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title={'Active'} onClick={() => {
                    changeFilter('active')
                }}/>
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'} onClick={() => {
                    changeFilter('completed')
                }}/>
            </div>
        </div>
    )
}