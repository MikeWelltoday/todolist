import React, {FC, useState} from 'react'
import S from './AddItemForm.module.scss'

//===============================================================================================================================================================

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

//===============================================================================================================================================================

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {

    const [newTitle, setNewInput] = useState('')
    const [error, setError] = useState<boolean>(false)

    function onChangeNewTitleHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setNewInput(e.currentTarget.value)
    }

    function onKeyUpAddItemHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        error && setError(false)
        if (e.key === 'Enter') onClickAddItemHandler()
    }

    function onClickAddItemHandler() {
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
                   onChange={onChangeNewTitleHandler}
                   onKeyUp={onKeyUpAddItemHandler}/>
            <button onClick={onClickAddItemHandler}>+</button>
            {error && <div className={S.errorMessage}>Field is required</div>}
        </div>
    )
}