import React, {FC, useState, memo} from 'react'
import S from './AddItemForm.module.scss'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

//========================================================================================
// 🎲 .T.Y.P.E.S.

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

//========================================================================================
// 🧁 .C.O.P.O.N.E.N.T.

export const AddItemForm: FC<AddItemFormPropsType> = memo((props) => {

    const [newTitle, setNewInput] = useState('')
    const [error, setError] = useState(false)

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
            <TextField
                value={newTitle}
                onChange={newTitleOnChangeHandler}
                onKeyUp={addItemOnKeyUPHandler}

                label={error ? 'TITLE IS REQUIRED' : 'NEW TITLE'}
                error={error}
            />

            <IconButton onClick={addItemOnClickHandler} color={'primary'}>
                <AddCircleOutlineIcon/>
            </IconButton>

        </div>
    )
})


