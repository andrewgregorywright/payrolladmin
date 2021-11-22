import EmployeesService				from '../data-access/services/employees.js'
import * as yup						from 'yup'

export default function employeesRoutes(app) {
	app.get('/employees/all', function (req, res) {
		res.render('pages/employees/all')
	})

	app.get('/employees/add', function (req, res) {
		res.render('pages/employees/add')
	})

	app.get('/employees/edit/:id', function (req, res) {
		res.render('pages/employees/edit', { id: req.params.id })
	})

	app.get('/js/employees/get-all', async function (req, res) {
		let employeesService = new EmployeesService()
		let emps = await employeesService.findAll()

		res.json({
				success: true,
				data: emps
			})
	})

	app.get('/js/employees/get-employee/:id', async function (req, res) {
		let employeesService = new EmployeesService()
		let emp = await employeesService.findOne(req.params.id)

		res.json({
				success: true,
				data: emp
			})
	})

	app.post('/js/employees/add', async function (req, res) {
		let employeesService = new EmployeesService()

		const nameRegex = /^[a-zA-Z\d\. ]+$/

		const schema = yup.object({
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

		try {
			let data = await schema.validate(req.body)

			await employeesService.addEmployee(data.name, data.department, data.salary)

			res.json({ success: true })

		} catch (err) {
			let msg = 'An error occured while trying to add an employee.'
			req.log.error(err, msg)
			res.json({ success: false })
		}
	})

	app.post('/js/employees/edit', async function (req, res) {
		let employeesService = new EmployeesService()

		const nameRegex = /^[a-zA-Z\d\. ]+$/

		const schema = yup.object({
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

		try {
			let data = await schema.validate(req.body)

			await employeesService.updateEmployee(data._id, data.name, data.department, data.salary)

			res.json({ success: true })

		} catch (err) {
			let msg = 'An error occured while trying to edit an employee.'
			req.log.error(err, msg)
			res.json({ success: false })
		}
	})

	app.post('/js/employees/delete', async function (req, res) {
		let employeesService = new EmployeesService()

		try {
			const schema = yup.object({
				_id:			yup.string()
									.trim()
									.required('An _id is required.')
									.matches(/^[0-9a-fA-F]{24}$/, 'Ids must be 24 hex chars.')
			})
			let data = await schema.validate(req.body)
			await employeesService.deleteEmployee(data._id)
			res.json({ success: true })

		} catch (err) {
			let msg = 'An error occured while trying to delete an employee.'
			req.log.error(err, msg)
			res.json({ success: false })
		}
	})
}
