import { useEffect, useState }			from 'react'
import displayMoney						from '../../helper/displayMoney'
import ReactDOM							from 'react-dom'
import Navbar							from '../../header/navbar'

function EmployeesAllMain () {
	return (<div>
			<div>
				<a className="btn btn-secondary"
				   href="/employees/add">Add employee</a>
			</div>
			<EmployeesTable />
		</div>)
}

function EmployeesTable () {

	let [ employees, setEmployees ] = useState([]),
		[ activeSalary, setActiveSalary ] = useState(0)

	useEffect(() => {
		$.ajax({
				url:			'/js/employees/get-all',
				method:			'GET',
				contentType:	'application/json; charset=utf-8',
				dataType:		'json',
				success:		(result) => {
					setEmployees(result.data)
				}
			})
	}, [])

	function deleteEmployee (id) {
		$.ajax({
				url:			'/js/employees/delete',
				method:			'POST',
				data:			JSON.stringify({ _id: id }),
				contentType:	'application/json; charset=utf-8',
				dataType:		'json',
				success:		(result) => {
					for (let i = 0; i < employees.length; i++) {
						if (employees[i]._id === id) {
							let copy = employees.slice()
							copy.splice(i, 1)
							setEmployees(copy)
							break
						}
					}
				}
			})
	}
	
	return (<>
			<div className="emp-table">
				<div className="emp-table__header">
					<div className="row p-3">
						<div className="col-12 col-lg-3">Name</div>
						<div className="col-12 col-lg-3">Department</div>
						<div className="col-12 col-lg-2 text-lg-end">Salary</div>
						<div className="col-12 col-lg-4">Actions</div>
					</div>
				</div>
				<div className="emp-table__rows">
					{employees.map(emp => (
						<EmployeeRow employee={emp} key={emp._id} deleteEmployee={deleteEmployee} />
					))}
				</div>
			</div>
		</>)
}

function EmployeeRow (props) {
	function editEmployee (id) {
		window.location = `/employees/edit/${id}`
	}

	function showCalculator(salary) {
		$('#modal-salary').text(displayMoney(salary))
		let calcModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('calculatorModal'))
		calcModal.show()
	}

	return (<div className="row align-items-center px-3 py-2">
			<div className="emp-table__name col-12 col-lg-3">
				{props.employee.name}
			</div>
			<div className="emp-table__department col-12 col-lg-3">
				{props.employee.department}
			</div>
			<div className="emp-table__salary col-12 col-lg-2 text-lg-end">
				{displayMoney(props.employee.salary)}
			</div>
			<div className="emp-table__actions col-12 col-lg-4">
				<button className="btn btn-secondary me-3 py-2"
						onClick={() => editEmployee(props.employee._id)}>Edit</button>
				<button className="btn btn-secondary me-3 py-2"
						onClick={() => props.deleteEmployee(props.employee._id)}>Delete</button>
				<button className="btn btn-secondary py-2"
						onClick={() => showCalculator(props.employee.salary)}>Calculator</button>
			</div>
		</div>)
}

$(function () {
	ReactDOM.render(<Navbar active="Employees" />, document.getElementById('header'))
	ReactDOM.render(<EmployeesAllMain />, document.getElementById('employees-main-content'))

	function updateModalTotal () {
		let salary = parseInt($('#modal-salary').text()),
			percentage = parseInt($('#modal-percentage').val() || 0),
			flat = parseInt($('#modal-flat').val() || 0)
		
		$('#modal-total').text(displayMoney(salary - salary * 0.01 * percentage - flat))
	}

	$('#modal-calculate-btn').click(updateModalTotal)
})
