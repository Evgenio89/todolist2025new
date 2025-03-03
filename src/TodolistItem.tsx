import {filterValueType, TaskType, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type TodolistItemType = {
    todolist: Todolist
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: filterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newStatusValue: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}


export const TodolistItem = ({
                                 todolist: {id, title, filter},
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 addTask,
                                 changeTaskStatus,
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle,

                             }: TodolistItemType) => {






    const changeFilterHandler = (filter: filterValueType) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const onCreateItemHandler = (title: string) => {
        addTask(id,  title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }


    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h3>
                <Button title={'X'} onClick={deleteTodolistHandler}/>
            </div>
            <CreateItemForm onCreateItem={onCreateItemHandler}/>





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

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>

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