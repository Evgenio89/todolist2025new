import {TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}



export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case "create_todolist": {
            return {...state, [action.payload.id]: []}
        }
        default:
            return state
        case "delete_todolist": {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
    }
}


type Actions = CreateTodolistAction | DeleteTodolistAction