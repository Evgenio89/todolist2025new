
import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'


type CreateItemFormPropsType = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem} : CreateItemFormPropsType) => {
    const [error, setError] = useState<string | null>(null)
    const [taskTitle, setTaskTitle] = useState('')

    const addTaskButtonHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
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
           <TextField label={'Enter a title'}
                      variant={'outlined'}
                      className={error ? 'error' : ''}
                      value={taskTitle}
                      size={'small'}
                      error={!!error}
                      helperText={error}
                      onChange={changeTaskTitleInputHandler}
                      onKeyDown={changeTaskTitleInputOnEnterHandler}/>
            <IconButton onClick={addTaskButtonHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
}