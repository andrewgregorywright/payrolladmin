import { ObjectId }					from 'mongodb'
import getMongoClient				from '../helpers/getMongoClient.js'
import EmployeesRepo				from '../repos/employees.js'



let employeesRepo = new EmployeesRepo()


export default class EmployeesService {
	async findAll() {
		let emps,
			client = await getMongoClient()

		emps = await employeesRepo.findAll(client.db())

		return emps
	}

	async findOne(id) {
		let emp,
			client = await getMongoClient()

		emp = await employeesRepo.findOne(client.db(), ObjectId(id))

		return emp
	}

	async addEmployee(name, department, salary) {
		let emp,
			client = await getMongoClient()

		emp = await employeesRepo.addEmployee(client.db(), name, department, salary)

		return emp
	}

	async updateEmployee(id, name, department, salary) {
		let emp,
			client = await getMongoClient()

		emp = await employeesRepo.updateEmployee(client.db(), ObjectId(id), name, department, salary)

		return emp
	}

	async deleteEmployee(id) {
		let client = await getMongoClient()

		await employeesRepo.deleteEmployee(client.db(), ObjectId(id))
	}
}
