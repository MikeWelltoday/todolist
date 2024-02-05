import React, {FC, useState} from 'react'
import S from './AddItemForm.module.scss'
import {Button} from '@mui/material'

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
            <input className={`${error && S.error}`}
                   type={'text'}
                   value={newTitle}
                   onChange={newTitleOnChangeHandler}
                   onKeyUp={addItemOnKeyUPHandler}/>
            {/*<button onClick={addItemOnClickHandler}>+</button>*/}
            <Button onClick={addItemOnClickHandler} variant={'contained'} color={'secondary'}>+</Button>
            {error && <div className={S.errorMessage}>Field is required</div>}
        </div>
    )
}