import React, {FC, useState} from 'react'
import S from './AddItemForm.module.scss'
import {TextField, IconButton} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

//===============================================================================================================================================================

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

//===============================================================================================================================================================

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {

    const [newTitle, setNewInput] = useState('')
    const [error, setError] = useState<boolean>(false)

    function newTitleOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setNewInput(e.currentTarget.value)
    }

    function addItemOnKeyUPHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        error && setError(false)
        if (e.key === 'Enter') addItemOnClickHandler()
    }

    function addItemOnClickHandler() {
        if (newTitle.trim() !== '') {
            props.addItem(newTitle)
            setNewInput('')
        } else {
            setError(true)
        }
    }

    return (
        <div className={S.addItemForm}>
            <TextField error={error}
                       variant={'outlined'}
                       label={'Type value'}
                       type={'text'}
                       helperText={error ? 'Field is required' : ''}
                       value={newTitle}
                       onChange={newTitleOnChangeHandler}
                       onKeyUp={addItemOnKeyUPHandler}/>
            <IconButton onClick={addItemOnClickHandler} color={'secondary'}>
                <AddCircleOutlineIcon color={'primary'}/>
            </IconButton>
        </div>
    )
}