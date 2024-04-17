import { useFormik } from 'formik'
import { useAppDispatch } from 'app/store'
import { authThunks } from 'state/reducers/auth-reducer'
import { AuthLoginResponseType } from 'api/auth-api'

type FormikErrorType = {
	email?: string
	password?: string
	rememberMe?: boolean
}


export const useLogin = () => {

	const dispatch = useAppDispatch()

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
		onSubmit: (values, { setSubmitting }) => {
			setSubmitting(true)
			dispatch(authThunks.authSetLoggedTC({
				email: values.email,
				password: values.password,
				rememberMe: values.rememberMe,
				captcha: true
			}))
				.unwrap()
				.then(() => {
					// formik.resetForm()
				})
				.catch((data: AuthLoginResponseType) => {
					if (data.fieldsErrors || data.messages) {
						if (data.fieldsErrors.length) {
							data.fieldsErrors.forEach(field => {
								formik.setFieldError(field.field, field.error)
							})
						} else {
							formik.setFieldError('email', data.messages[0])
						}
					}
				})
				.finally(() => {
					setSubmitting(false)
				})
		}
	})

	return {
		formik
	}
}