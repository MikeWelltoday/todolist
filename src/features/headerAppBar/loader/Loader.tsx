import React, { FC } from 'react'
import S from './Loader.module.scss'
import LinearProgress from '@mui/material/LinearProgress'
import { useSelector } from 'react-redux'
import { appStatusSelector } from 'state/selectors/appStatus-selector'

//========================================================================================

export const Loader: FC = () => {

	console.log('⏳ LOADER')

	const status = useSelector(appStatusSelector)

	return (
		<div className={S.loaderContainer}>
			{status === 'loading' && <LinearProgress color={'primary'} />}
		</div>
	)
}

