import Button from '@mui/material/Button'
import { ButtonProps } from '@mui/material/Button'
import { FC, memo } from 'react'

//========================================================================================

type FilterButtonProps = {
	title: string
} & ButtonProps

//========================================================================================

export const CustomButton: FC<FilterButtonProps> = memo((props) => {
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