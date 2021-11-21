import EmployeesService				from './data-access/services/employees.js'




(async function () {
	let employeesService = new EmployeesService()

	let results = await Promise.all([
		employeesService.addEmployee('Eric', 'Dept. A', 76000.24),
		employeesService.addEmployee('Sammy', 'Dept. A', 84000.00),
		employeesService.addEmployee('Steve', 'Dept. B', 52000.00)
	])

	console.log('-------------- original list')
	console.log(await employeesService.findAll())

	console.log('-------------- sammy')
	let sammy = await employeesService.findOne(results[1]._id)
	console.log(sammy)
	console.log('-------------- sammy updated')
	await employeesService.updateEmployee(sammy._id.toString(), 'Samuel', 'Dept. C', 150000.00)
	sammy = await employeesService.findOne(sammy._id.toString())
	console.log(sammy)


	console.log('-------------- sammy deleted')
	await employeesService.deleteEmployee(sammy._id.toString())

	console.log('-------------- sammy')
	sammy = await employeesService.findOne(results[1]._id)
	console.log(sammy)

	console.log('-------------- all')
	console.log(await employeesService.findAll())
}());
