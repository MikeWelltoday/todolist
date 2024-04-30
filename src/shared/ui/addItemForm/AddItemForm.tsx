import React, { FC, useState, memo } from 'react'
import S from 'shared/ui/addItemForm/AddItemForm.module.scss'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { RequestEntityStatus } from '../../types/commonTypes'

//========================================================================================

type AddItemFormProps = {
	todolistEntityStatus?: RequestEntityStatus

	addItem: (title: string) => Promise<any>
}

//========================================================================================

export const AddItemForm: FC<AddItemFormProps> = memo((props) => {

	const [title, setTitle] = useState('')
	const [error, setError] = useState('')
	const isDisabled = props.todolistEntityStatus === 'loading'

	function newTitleHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setTitle(e.currentTarget.value)
	}

	function addItemOnKeyUpHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		error && setError('')
		if (e.key === 'Enter') addItemHandler()
	}

	function addItemHandler() {

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
				onChange={newTitleHandler}
				onKeyUp={addItemOnKeyUpHandler}
				onBlur={onBlurErrorClearHandler}

				label={error || 'NEW TITLE'}
				error={!!error}
				disabled={isDisabled}
			/>

			<IconButton onClick={addItemHandler} color={'primary'} disabled={isDisabled}>
				<AddBoxIcon />
			</IconButton>

		</div>
	)
})


