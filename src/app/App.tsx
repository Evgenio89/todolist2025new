import './App.css'
import {TodolistItem} from "../TodolistItem.tsx";
import {useReducer, useState} from "react";
import {CreateItemForm} from "../CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {NavButton} from '../NavButton.ts'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {containerSx} from '../TodolistItem.styles.ts'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "../model/tasks-reducer.ts";




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

type ThemeMode = 'dark' | 'light'


export const App = () => {

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, []);
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {});

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#ef6c00',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }



    const changeFilter = (todolistId: string, filter: filterValueType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
    }







    const  deleteTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(deleteTaskAC(todolistId, taskId))
    }

    const addItem = (todolistId: string, title: string) => {
        dispatchToTasks(createTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatusValue: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, taskId, newStatusValue))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
       dispatchToTasks(changeTaskTitleAC(todolistId, taskId, title))
    }


    const deleteTodolist = (todolistId: string) => {
        dispatchToTodolists(deleteTodolistAC(todolistId))
        dispatchToTasks(deleteTodolistAC(todolistId))
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AppBar position={'static'} sx={{mb: '30px'}}>
              <Toolbar sx={containerSx}>
                      <IconButton color={'inherit'}>
                          <MenuIcon/>
                      </IconButton>
                      <div>
                          <NavButton background={theme.palette.divider}>Sign in</NavButton>
                          <NavButton background={theme.palette.divider}>Sign up</NavButton>
                          <NavButton background={theme.palette.primary.dark}>Fag</NavButton>
                          <Switch color={'default'} onChange={changeMode}/>
                      </div>
              </Toolbar>
          </AppBar>
          <Container maxWidth={'lg'}>
              <Grid container sx={{mb: '30px'}}>
                  <CreateItemForm onCreateItem={createTodolist}/>
              </Grid>
              <Grid container spacing={4}>
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
                          <Grid key={todolist.id}>
                              <Paper sx={{p: '0 20px 20px 20px'}}>
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
                              </Paper>
                          </Grid>
                      )
                  })}
              </Grid>
          </Container>
      </ThemeProvider>
  )
}


