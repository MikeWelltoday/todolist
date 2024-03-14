import Button from '@mui/material/Button'
import {ButtonProps} from '@mui/material/Button'
import {FC, memo} from 'react'

//========================================================================================

type FilterButtonPropsType = {
    title: string
} & ButtonProps

//========================================================================================


export const FilterButton: FC<FilterButtonPropsType> = memo((props) => {

    console.log('filterButton => R E N D E R')

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