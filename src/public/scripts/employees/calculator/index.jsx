import { useEffect, useState }			from 'react'
import displayMoney						from '../../helper/displayMoney'

function Calculator (props) {
	
	let [percentage, setPercentage] = useState(0),
		[flat, setFlat] = useState(0),
		[amt, setAmt] = useState(props.salary)
	
	function calculateAmt () {
		setAmt(displayMoney(props.salary - percentage * props.salary - flat))
	}

	function onPercentageChange (e) {
		setPercentage(e.target.value)
		calculateAmt()
	}

	function onFlatChange (e) {
		setFlat(e.target.value)
		calculateAmt()
	}

	return (<>
			<div className="row mb-3">
				<div className="col-12 col-sm-3">
					<label htmlFor="salary"
						   className="col-form-label">Salary:</label>
				</div>
				<div className="col-12 col-sm-9">
					{props.salary}
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-12 col-sm-3">
					<label htmlFor="salary"
						   className="col-form-label">Flat deduction:</label>
				</div>
				<div className="col-12 col-sm-9">
					<input  type="text"
							className="form-control"
							value={flat}
							onChange={onFlatChange} />
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-12 col-sm-3">
					<label htmlFor="salary"
						   className="col-form-label">Percentage deduction:</label>
				</div>
				<div className="col-12 col-sm-9">
					<input  type="text"
							className="form-control"
							value={percentage}
							onChange={onPercentageChange} />
				</div>
			</div>

			<div className="row mb-3">
				<div className="col-12 col-sm-3">
					<label className="col-form-label">Total:</label>
				</div>
				<div className="col-12 col-sm-9 text-end">
					{amt}
				</div>
			</div>
		</>)
}
