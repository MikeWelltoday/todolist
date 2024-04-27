import React, { FC } from 'react'
import S from './LoginPage.module.scss'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { AuthLoginResponseType, captchaSelector, isLoggedSelector } from '../../entities'
import { useAppDispatch } from '../../shared'
import { authActions } from '../../entities/authSlice/authSlice'

//========================================================================================

type FormikErrorType = {
	email?: string
	password?: string
	rememberMe?: boolean
	captcha?: string
}

//========================================================================================

export const LoginPage: FC = () => {

	const dispatch = useAppDispatch()
	const isLogged = useSelector(isLoggedSelector)
	const captcha = useSelector(captchaSelector)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
			captcha: ''
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
		onSubmit: (values, { setSubmitting }) => {
			setSubmitting(true)

			// если обычная логинизация без каптчи, то просто отправим пустую строку
			// там в API запроссе она преобразуется к boolean

			dispatch(authActions.loginThunk({
				email: values.email,
				password: values.password,
				rememberMe: values.rememberMe,
				captcha: values.captcha
			}))
				.unwrap()
				.catch((data: AuthLoginResponseType) => {
					// проверка что вообще пришло что-то в data
					// зависит - попали ли мы в санке в handleServerError
					if (data.fieldsErrors || data.messages) {
						// проверяем есть ли поле fieldsErrors
						if (data.fieldsErrors.length) {
							data.fieldsErrors.forEach(field => {
								formik.setFieldError(field.field, field.error)
							})
						} else {
							// если нет поля fieldsErrors, то отобразим поле messages
							formik.setFieldError('email', data.messages[0])
						}
					}
				})
				.finally(() => {
					setSubmitting(false)
				})
		}
	})

	const emailError = formik.touched.email && formik.errors.email
	const passwordError = formik.touched.password && formik.errors.password
	const captchaError = formik.errors.captcha
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
								disabled={formik.isSubmitting}
								{...formik.getFieldProps('email')}
							/>
							{emailError ? <div className={S.error}>{formik.errors.email}</div> : null}

							<TextField
								type='password'
								label='Password'
								margin='normal'
								color={'success'}
								disabled={formik.isSubmitting}
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
										disabled={formik.isSubmitting}
									/>
								}
							/>

							<Button
								type={'submit'}
								variant={'contained'}
								color={'success'}
								disabled={formik.isSubmitting || !!isError}
							>
								Login
							</Button>


							{/*{ помещаем ошибку captcha в field }*/}
							{captchaError &&
								<div className={`${S.error} ${S.captchaError}`}>{formik.errors.captcha}</div>}
							{/*{ отобразим саму картинку captcha }*/}
							{captcha &&
								<>
									<img className={S.captchaImg} src={captcha} alt={'captcha'} />

									<TextField
										label='Captcha'
										margin='normal'
										color={'secondary'}
										disabled={formik.isSubmitting}
										{...formik.getFieldProps('captcha')}
									/>
								</>
							}
						</FormGroup>
					</FormControl>

				</form>
			</Grid>
		</Grid>
	)
}