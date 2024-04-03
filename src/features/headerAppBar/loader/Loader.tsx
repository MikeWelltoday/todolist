import React, { FC } from 'react'
import S from './Loader.module.scss'
import LinearProgress from '@mui/material/LinearProgress'
import { useSelector } from 'react-redux'
import { appStatusSelector } from 'state'

//========================================================================================

export const Loader: FC = () => {

	console.log('⏳ LOADER')

	const status = useSelector(appStatusSelector)

	return (
		<div className={S.loaderContainer}>
			{status && <LinearProgress color={'primary'} />}
		</div>
	)
}

