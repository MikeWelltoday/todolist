import React, { ChangeEvent, FC, useState, KeyboardEvent, memo, useCallback } from 'react'
import s from 'components/editableSpan/EditableSpan.module.scss'
import TextField from '@mui/material/TextField'
import { RequestStatusType } from 'features/todolistsList/model/todolist/todolists-reducer'

//========================================================================================

type EditableSpanPropsType = {
	title: string
	entityStatus: RequestStatusType
	onChangeTitle: (newTitle: string) => void
}

//========================================================================================

export const EditableSpan: FC<EditableSpanPropsType> = memo((props) => {

	const [changeMode, setChangeMode] = useState(false)
	const [title, setTitle] = useState(props.title)
	const isDisabled = props.entityStatus === 'loading'

	function newTitleOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		setTitle(event.currentTarget.value)
	}


	const deactivateChangeMode = useCallback(() => {
		setChangeMode(false)
		props.onChangeTitle(title.trim())
	}, [title, props.onChangeTitle, props.title])

	function activateChangeMode() {
		setChangeMode(true)
		setTitle(props.title)
	}

	function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Escape' || event.key === 'Enter') deactivateChangeMode()
	}


	return (
		(changeMode && !isDisabled) ?
			<TextField
				className={s.EditableSpan}
				variant='standard'
				value={title}
				onBlur={deactivateChangeMode}
				onKeyDown={onKeyDown}
				onChange={newTitleOnChangeHandler}
				autoFocus
			/>
			:
			<span
				className={`${s.EditableSpan} ${isDisabled && s.disabled}`}
				onDoubleClick={activateChangeMode}
			>
                {props.title}
            </span>
	)
})