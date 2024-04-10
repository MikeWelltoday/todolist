import React, { FC } from 'react'
import S from './Login.module.scss'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { authThunks, isLoggedSelector } from 'state'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from 'app/store'

//========================================================================================

type FormikErrorType = {
	email?: string
	password?: string
	rememberMe?: boolean
}

//========================================================================================

export const Login: FC = () => {

	const dispatch = useAppDispatch()
	const isLogged = useSelector(isLoggedSelector)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		validate: values => {
			const errors: FormikErrorType = {}

			if (!values.email) {
				errors.email = 'Required'
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address'
			}

			if (!values.password) {
				errors.password = 'Required'
			} else if (values.password.length < 6) {
				errors.password = 'Password has to be more than 6 symbols'
			}

			return errors
		},
		onSubmit: values => {
			dispatch(authThunks.authSetLoggedTC({
				email: values.email,
				password: values.password,
				rememberMe: values.rememberMe,
				captcha: true
			}))
			formik.resetForm()
		}
	})

	const emailError = formik.touched.email && formik.errors.email
	const passwordError = formik.touched.password && formik.errors.password
	const isError = emailError || passwordError

	if (isLogged) return <Navigate to={'/'} />

	return (
		<Grid container justifyContent={'center'}>
			<Grid item justifyContent={'center'}>
				<form onSubmit={formik.handleSubmit}>

					<FormControl>
						<FormLabel>
							<p>
								To log in get registered
								<a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
									here
								</a>
							</p>
							<p>or use common test account credentials:</p>
							<p>Email: free@samuraijs.com</p>
							<p>Password: free</p>
						</FormLabel>
						<FormGroup>

							<TextField
								label='Email'
								margin='normal'
								color={'success'}
								error={!!emailError}
								{...formik.getFieldProps('email')}
							/>
							{emailError ? <div className={S.error}>{formik.errors.email}</div> : null}

							<TextField
								type='password'
								label='Password'
								margin='normal'
								color={'success'}
								error={!!passwordError}
								{...formik.getFieldProps('password')}
							/>
							{passwordError ? <div className={S.error}>{formik.errors.password}</div> : null}

							<FormControlLabel
								label={'Remember me'}
								control={
									<Checkbox
										color={'success'}
										name='remember me'
										onChange={formik.handleChange}
										value={formik.values.rememberMe}
									/>
								}
							/>

							<Button
								type={'submit'}
								variant={'contained'}
								color={'success'}
								disabled={!!isError}
							>
								Login
							</Button>


						</FormGroup>
					</FormControl>

				</form>
			</Grid>
		</Grid>
	)
}