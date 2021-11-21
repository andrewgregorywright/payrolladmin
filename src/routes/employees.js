export default function employeesRoutes(app) {
	app.get('/employees/all', function (req, res) {
		res.render('pages/home/index')
	})
}
