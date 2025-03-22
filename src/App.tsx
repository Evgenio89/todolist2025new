import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {NavButton} from './NavButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'




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
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>(
        [
            { id: todolistId1, title: 'What to learn', filter: 'all' },
            { id: todolistId2, title: 'What to buy', filter: 'all' },
        ]
    )

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

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
        setTodolists(todolists.map(todo => todo.id === todolistId? {...todo, filter} : todo))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, title} : todo))
    }







    const  deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId] : tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const addItem = (todolistId: string, title: string) => {
            const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId] : [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatusValue: boolean) => {
        setTasks({...tasks, [todolistId] : tasks[todolistId].map(task => task.id === taskId? {...task, isDone: newStatusValue} : task)})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId] : tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }


    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todo => todo.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks })
    }

    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: Todolist = {
            id: todolistId,
            title: title,
            filter: 'all',
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AppBar position={'static'} sx={{mb: '30px'}}>
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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


