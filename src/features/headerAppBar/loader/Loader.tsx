import React, {FC} from 'react'
import S from './Loader.module.scss'
import LinearProgress from '@mui/material/LinearProgress'
import {useSelector} from 'react-redux'
import {statusSelector} from '../../../state'

//========================================================================================

export const Loader: FC = () => {

    console.log('⏳ LOADER')

    const status = useSelector(statusSelector)

    return (
        <div className={S.loaderContainer}>
            {status === 'loading' && <LinearProgress color={'primary'}/>}
        </div>
    )
}

