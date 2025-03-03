import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";


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
            <input
                className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeTaskTitleInputHandler}
                onKeyDown={changeTaskTitleInputOnEnterHandler}
            />
            <Button title={'+'} onClick={addTaskButtonHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}