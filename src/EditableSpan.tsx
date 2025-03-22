import {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';


type EditableSpanPropsType = {
    value: string
    onChange: (title: string) => void;
}

export const EditableSpan = ({
                                 value,
                                 onChange,
                             }: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState<string>(value);

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }


    return (
        <>
            {isEditMode ? (
                <TextField variant={'outlined'}
                           value={title}
                           size={'small'}
                           onChange={changeTitle}
                           onBlur={turnOffEditMode}
                           autoFocus/>
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>

    )
}