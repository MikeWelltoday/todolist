import React, { ChangeEvent, FC, useState, KeyboardEvent, memo, useCallback } from 'react'
import s from 'shared/ui/editableSpan/EditableSpan.module.scss'
import TextField from '@mui/material/TextField'
import { RequestEntityStatus } from '../../types/commonTypes'

//========================================================================================

type EditableSpanPropsType = {
	title: string
	entityStatus: RequestEntityStatus
	onChangeTitle: (newTitle: string) => void
}

//========================================================================================

export const EditableSpan: FC<EditableSpanPropsType> = memo((props) => {

	const [changeMode, setChangeMode] = useState(false)
	const [title, setTitle] = useState(props.title)
	const isDisabled = props.entityStatus === 'loading'

	function newTitleHandler(event: ChangeEvent<HTMLInputElement>) {
		setTitle(event.currentTarget.value)
	}

	const deactivateChangeModeHandler = useCallback(() => {
		setChangeMode(false)
		props.onChangeTitle(title.trim())
	}, [title, props.onChangeTitle, props.title])

	function activateChangeModeHandler() {
		setChangeMode(true)
		setTitle(props.title)
	}

	function onKeyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Escape' || event.key === 'Enter') deactivateChangeModeHandler()
	}

	return (
		(changeMode && !isDisabled) ?
			<TextField
				className={s.EditableSpan}
				variant='standard'
				value={title}
				onBlur={deactivateChangeModeHandler}
				onKeyDown={onKeyDownHandler}
				onChange={newTitleHandler}
				autoFocus
			/>
			:
			<span
				className={`${s.EditableSpan} ${isDisabled && s.disabled}`}
				onDoubleClick={activateChangeModeHandler}
			>
                {props.title}
            </span>
	)
})