import {filterValueType, TaskType, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistItemType = {
    todolist: Todolist
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: filterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newStatusValue: boolean) => void
    deleteTodolist: (todolistId: string) => void
}


export const TodolistItem = ({
                                 todolist: {id, title, filter},
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 addTask,
                                 changeTaskStatus,
                                 deleteTodolist,

                             }: TodolistItemType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskButtonHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            addTask(id, trimmedTitle)
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

    const changeFilterHandler = (filter: filterValueType) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }


    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'X'} onClick={deleteTodolistHandler}/>
            </div>
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
                            deleteTask(id, task.id)
                        }
                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(id, task.id, event.currentTarget.checked)
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
                    title={'All'}
                    onClick={() => {changeFilterHandler('all')
                }}/>
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => {changeFilterHandler('active')
                }}/>
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => {changeFilterHandler('completed')
                }}/>
            </div>
        </div>
    )
}