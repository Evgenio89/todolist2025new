import {TasksState} from '../app/App.tsx'
import {
    CreateTodolistAction,
    DeleteTodolistAction
} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: TasksState = {}

type Actions = CreateTodolistAction | DeleteTodolistAction
    | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskStatusTitle

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskStatusTitle = ReturnType<typeof changeTaskTitleAC>



export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case "create_todolist": {
            return {...state, [action.payload.id]: []}
        }
        case "delete_todolist": {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case "delete_task": {
            return {...state, [action.payload.id] : state[action.payload.id].filter(task => task.id !== action.payload.taskId)}
        }
        case "create_task": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return  {...state, [action.payload.id] : [newTask, ...state[action.payload.id]]}
        }
        case "change_task_statusAC": {
            return {...state, [action.payload.id] : state[action.payload.id].map(task => task.id === action.payload.taskId? {...task, isDone: action.payload.isDone} : task)}
        }
        case 'change_task_titleAC': {
            return {...state, [action.payload.id] : state[action.payload.id].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)}
        }
        default:
            return state


    }
}


export const  deleteTaskAC = (id: string, taskId: string)=> {
    return {
        type: 'delete_task',
        payload: {id, taskId}
    } as const
}
export const  createTaskAC = (id: string, title: string)=> {
    return {
        type: 'create_task',
        payload: {id, title}
    } as const
}

export const  changeTaskStatusAC = (id: string, taskId: string, isDone: boolean)=> {
    return {
        type: 'change_task_statusAC',
        payload: {id, taskId, isDone}
    } as const
}

export const  changeTaskTitleAC = (id: string, taskId: string, title: string)=> {
    return {
        type: 'change_task_titleAC',
        payload: {id, taskId, title}
    } as const
}


