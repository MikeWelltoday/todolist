import Button from '@mui/material/Button'
import { ButtonProps } from '@mui/material/Button'
import { FC, memo } from 'react'

type FilterButtonPropsType = {
	title: string
} & ButtonProps

export const CustomButton: FC<FilterButtonPropsType> = memo((props) => {
	return (
		<Button
			color={props.color}
			variant={props.variant}
			onClick={props.onClick}
		>
			{props.title}
		</Button>
	)
})