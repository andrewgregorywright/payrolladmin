export default function homeRoutes(app) {
	app.get('/', function (req, res) {
		res.render('pages/home/index')
	})
}
