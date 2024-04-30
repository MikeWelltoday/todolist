import Button, { ButtonProps } from '@mui/material/Button'
import { memo } from 'react'

//========================================================================================

type Props = {
	title: string
} & ButtonProps

//========================================================================================

export const CustomButton = memo((props: Props) => {
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