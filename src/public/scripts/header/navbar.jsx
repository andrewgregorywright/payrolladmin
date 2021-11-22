export default function Navbar (props) {

	let links = [
			{
				display: 'Home',
				href: '/'
			}, {
				display: 'Employees',
				href: '/employees/all'
		}]

	return (<nav className="navbar navbar-expand-sm navbar-light bg-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">PayrollAdmin</a>
				<button className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-sm-0">
						{links.map(l => {
							if (props.active === l.display) {
								return (<li className="nav-item" key={l.href}>
										<a className="nav-link active" aria-current="page" href={l.href}>{l.display}</a>
									</li>)
							} else {
								return (<li className="nav-item" key={l.href}>
										<a className="nav-link" href={l.href}>{l.display}</a>
									</li>)
							}
						})}
					</ul>
				</div>
			</div>
		</nav>)
}
