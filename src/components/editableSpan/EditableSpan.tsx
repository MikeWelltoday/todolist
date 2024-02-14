import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react'
import S from './EditableSpan.module.scss'
import TextField from '@mui/material/TextField'

//========================================================================================

type EditableSpanPropsType = {
    children: string
    onChangeTitle: (newTitle: string) => void
}

//========================================================================================

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    function newTitleOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value)
    }

    function activateEditMode() {
        setEditMode(true)
        setTitle(props.children)
    }

    function activateViewMode() {
        setEditMode(false)
        props.onChangeTitle(title.trim())
    }

    function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Escape' || event.key === 'Enter') activateViewMode()
    }


    return (
        editMode ?
            <TextField
                className={S.EditableSpan}
                type="text"
                value={title}
                onBlur={activateViewMode}
                onKeyDown={onKeyDown}
                onChange={newTitleOnChangeHandler}
                autoFocus
                variant="standard"
            />
            :
            <span
                className={S.EditableSpan}
                onDoubleClick={activateEditMode}
            >
                {props.children}
            </span>
    )
}