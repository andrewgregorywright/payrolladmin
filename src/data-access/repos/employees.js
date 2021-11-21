






export default class EmployeesRepo {
	async findAll(db) {
		let emps = await db.collection('employees')
			.find({}).toArray()

		return emps
	}

	async findOne(db, _id) {
		let emp = await db.collection('employees')
			.findOne({ _id })

		return emp
	}

	async addEmployee(db, name, department, salary) {
		let result,
			employee = {
				name,
				department,
				salary
			}

		result = await db.collection('employees')
			.insertOne(employee)

		employee = Object.assign({ _id: result.insertedId }, employee)

		return employee
	}

	async updateEmployee(db, _id, name, department, salary) {
		let result = await db.collection('employees')
			.updateOne({
				_id
			}, {
				$set: {
					name,
					department,
					salary
				}
			})

		if (result.matchedCount !== 1) {
			throw new Error(`Unable to update employee _id ${_id.toString()}.`)
		}
	}

	async deleteEmployee(db, _id) {
		let result = await db.collection('employees')
			.deleteOne({ _id })

		if (result.deletedCount !== 1) {
			throw new Error(`Unable to delete employee _id ${_id.toString()}.`)
		}
	}
}
