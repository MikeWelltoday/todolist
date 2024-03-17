import React, {ChangeEvent, FC, useState, KeyboardEvent, memo, useCallback} from 'react'
import S from './EditableSpan.module.scss'
import TextField from '@mui/material/TextField'

//========================================================================================

type EditableSpanPropsType = {
    children: string
    onChangeTitle: (newTitle: string) => void
}

//========================================================================================

export const EditableSpan: FC<EditableSpanPropsType> = memo((props) => {

    console.log('🧄 EDITABLE-SPAN')

    const [changeMode, setChangeMode] = useState(false)
    const [title, setTitle] = useState(props.children)

    function newTitleOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value)
    }


    const deactivateChangeMode = useCallback(() => {
        setChangeMode(false)
        props.onChangeTitle(title.trim())
    }, [title, props.onChangeTitle, props.children])

    function activateChangeMode() {
        setChangeMode(true)
        setTitle(props.children)
    }

    function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Escape' || event.key === 'Enter') deactivateChangeMode()
    }

    return (
        changeMode ?
            <TextField
                className={S.EditableSpan}
                variant="standard"
                value={title}
                onBlur={deactivateChangeMode}
                onKeyDown={onKeyDown}
                onChange={newTitleOnChangeHandler}
                autoFocus
            />
            :
            <span
                className={S.EditableSpan}
                onDoubleClick={activateChangeMode}
            >
                {props.children}
            </span>
    )
})