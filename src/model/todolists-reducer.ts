import {filterValueType, Todolist} from "../App.tsx";
import {v1} from "uuid";


const initialState: Todolist[] = []

export const deleteTodolistAC = (id: string) => {
    return {
        type: 'delete_todolist',
        payload: {id}
    } as const
}
export const createTodolistAC = (title: string) => {
    const id = v1()
    return {
        type: 'create_todolist',
        payload: {id, title}
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'change_todolist_title',
        payload: { id, title }
    } as const
}
export const  changeTodolistFilterAC = (id: string, filter: filterValueType)=> {
    return {
        type: 'change_todolist_filterAC',
        payload: {id, filter}
    } as const
}

export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction


export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'change_todolist_title': {
            return state.map(todo => todo.id === action.payload.id ? {...todo, title: action.payload.title} : todo)
        }
        case 'change_todolist_filterAC': {
            return  state.map(todo => todo.id === action.payload.id? {...todo, filter: action.payload.filter} : todo)
        }
        default:
            return state
    }
}