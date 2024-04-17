import React, { FC, useState, memo } from 'react'
import S from 'components/addItemForm/AddItemForm.module.scss'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { RequestStatusType } from 'features/todolistsList/model/todolist/todolists-reducer'

//========================================================================================

type AddItemFormPropsType = {
	todolistEntityStatus?: RequestStatusType

	addItem: (title: string) => void
}

//========================================================================================

export const AddItemForm: FC<AddItemFormPropsType> = memo((props) => {

	console.log('🥨 ADD-ITEM-FROM ')

	const [newTitle, setNewInput] = useState('')
	const [error, setError] = useState(false)
	const disabled = props.todolistEntityStatus === 'loading'

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
				disabled={disabled}
			/>

			<IconButton onClick={addItemOnClickHandler} color={'primary'} disabled={disabled}>
				<AddCircleOutlineIcon />
			</IconButton>

		</div>
	)
})


