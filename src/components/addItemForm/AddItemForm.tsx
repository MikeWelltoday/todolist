import React, {FC, useState} from 'react'
import S from './AddItemForm.module.scss'
import {TextField, IconButton} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {AddBox} from '@mui/icons-material'

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
            <TextField type={'text'}
                       variant={'outlined'}
                       value={newTitle}
                       onChange={newTitleOnChangeHandler}
                       onKeyUp={addItemOnKeyUPHandler}
                       label={'Type value'}
                       error={error}
                       helperText={error ? 'Field is required' : ''}
            />

            <IconButton onClick={addItemOnClickHandler} color={'primary'}>
                <AddBox color={'primary'}/>
            </IconButton>

        </div>
    )
}