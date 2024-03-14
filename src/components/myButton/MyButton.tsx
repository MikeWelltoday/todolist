import Button from '@mui/material/Button'
import {ButtonProps} from '@mui/material/Button'
import {FC, memo} from 'react'

//========================================================================================

type MyButtonPropsType = {
    title: string
} & ButtonProps

//========================================================================================


export const MyButton: FC<MyButtonPropsType> = memo((props) => {
    console.log('myButton => R E N D E R')
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