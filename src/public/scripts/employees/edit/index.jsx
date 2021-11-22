import { useEffect, useState }			from 'react'
import {
		Formik,
		Form,
		Field,
		ErrorMessage
	}									from 'formik'
import displayMoney						from '../../helper/displayMoney'
import CustomErrorMsg					from '../../validation/customErrorMsg'
import Navbar							from '../../header/navbar'
import ReactDOM							from 'react-dom'
import * as yup							from 'yup'
import $								from 'jquery'

const nameRegex = /^[a-zA-Z\d\. ]+$/

const validationSchema = yup.object({
	name:			yup.string()
						.trim()
						.required('A name is required.')
						.min(1, 'Names must be at least one character in length.')
						.matches(nameRegex, 'Names can only consist of letters, ' +
							'numbers, and spaces.'),
	department:		yup.string()
						.trim()
						.required('A department name is required.')
						.min(1, 'Departments must be at least one character in length.')
						.matches(nameRegex, 'Department names can only consist of letters, ' +
							'numbers, and spaces.'),
	salary:			yup.number('The salary must be a number.')
						.required('The salary must be a number.')
})

export default function EditEmployee (props) {
	
	let [serverError, setServerError] = useState(''),
		[initialValues, setInitialValues] = useState({
				id:				'',
				name:			'',
				department:		'',
				salary:			0
			})

	useEffect(() => {
		$.ajax({
				url:			`/js/employees/get-employee/${props.id}`,
				method:			'GET',
				contentType:	'application/json; charset=utf-8',
				dataType:		'json',
				success:		(result) => {
					if (result.success) {
						setInitialValues(result.data)
					} else {
						setServerError('An error has occurred...')
					}
				}
			})
	}, [])

	const onSubmit = (values, onSubmitProps) => {
		$.ajax({
				url:			'/js/employees/edit',
				method:			'POST',
				data:			JSON.stringify(values),
				contentType:	'application/json; charset=utf-8',
				dataType:		'json',
				success:		(result) => {
					if (!result.success) {
						let msg = 'An unknown error has occurred. ' +
								  'Please try again or contact us for assistance.'

						setServerError(msg)
					} else {
						window.location = '/employees/all'
					}
				},
				complete:		() => {
					onSubmitProps.setSubmitting(false)
				}
			})
	}

	const onCancel = () => {
		window.location = '/employees/all'
	}

	return (
		<>
			{serverError ? <div className="server-error validation">{serverError}</div> : null}
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				enableReinitialize={true}
				validateOnMount
				onSubmit={onSubmit}>
				{formik => {
					return (
						<Form>
							<div className="row mb-3">
								<div className="col-12 col-sm-3">
									<label htmlFor="name"
										   className="col-form-label">Name:</label>
								</div>
								<div className="col-12 col-sm-9">
									<Field type="text" name="name" className="form-control" />
									<ErrorMessage name="name" component={CustomErrorMsg} />
								</div>
							</div>

							<div className="row mb-3">
								<div className="col-12 col-sm-3">
									<label htmlFor="department"
										   className="col-form-label">Department:</label>
								</div>
								<div className="col-12 col-sm-9">
									<Field type="text" name="department" className="form-control" />
									<ErrorMessage name="department" component={CustomErrorMsg} />
								</div>
							</div>

							<div className="row mb-3">
								<div className="col-12 col-sm-3">
									<label htmlFor="salary"
										   className="col-form-label">Salary:</label>
								</div>
								<div className="col-12 col-sm-9">
									<Field type="salary" name="salary" className="form-control" />
									<ErrorMessage name="salary" component={CustomErrorMsg} />
								</div>
							</div>

							<div className="row">
								<div className="col-12 text-end">
									<button
										className="btn btn-secondary me-3"
										type="button"
										onClick={onCancel}>Cancel</button>
									<button
										className="btn btn-secondary"
										type="submit"
										disabled={!formik.isValid || formik.isSubmitting}>Save</button>
								</div>
							</div>
						</Form>
					)
				}}
			</Formik>
		</>
	)
}

$(function () {
	let id = $('#emp-id').val()
	ReactDOM.render(<Navbar active="Employees" />, document.getElementById('header'))
	ReactDOM.render(<EditEmployee id={id} />, document.getElementById('employees-edit'))
})
