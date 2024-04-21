import React, { FC, useState, memo } from 'react'
import S from 'shared/ui/addItemForm/AddItemForm.module.scss'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { RequestEntityStatusType } from '../../types/commonTypes'


type PropsType = {
	todolistEntityStatus?: RequestEntityStatusType

	addItem: (title: string) => Promise<any>
}

export const AddItemForm: FC<PropsType> = memo((props) => {

	const [title, setTitle] = useState('')
	const [error, setError] = useState('')
	const isDisabled = props.todolistEntityStatus === 'loading'

	function newTitleOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setTitle(e.currentTarget.value)
	}

	function addItemOnKeyUPHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		error && setError('')
		if (e.key === 'Enter') addItemOnClickHandler()
	}

	function addItemOnClickHandler() {

		if (title.trim() === '') {
			setError('Title Required')
			return
		}

		if (title.trim().length >= 100) {
			setError('Title shorter than 100 symbols')
			return
		}

		props.addItem(title)
			.then(() => setTitle(''))
			.catch(() => setError('Error'))
	}

	function onBlurErrorClearHandler() {
		setError('')
	}

	return (
		<div className={S.addItemForm}>
			<TextField
				value={title}
				onChange={newTitleOnChangeHandler}
				onKeyUp={addItemOnKeyUPHandler}
				onBlur={onBlurErrorClearHandler}

				label={error || 'NEW TITLE'}
				error={!!error}
				disabled={isDisabled}
			/>

			<IconButton onClick={addItemOnClickHandler} color={'primary'} disabled={isDisabled}>
				<AddCircleOutlineIcon />
			</IconButton>

		</div>
	)
})


