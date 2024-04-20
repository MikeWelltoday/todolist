import React, { FC } from 'react'
import S from './Loader.module.scss'
import LinearProgress from '@mui/material/LinearProgress'
import { useSelector } from 'react-redux'
import { appStatusSelector } from '../../../state/appSlice'

export const Loader: FC = () => {
	const status = useSelector(appStatusSelector)
	return (
		<div className={S.loaderContainer}>
			{status === 'loading' && <LinearProgress color={'primary'} />}
		</div>
	)
}

