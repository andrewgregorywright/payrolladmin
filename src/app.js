import express					from 'express'
import path						from 'path'
import { fileURLToPath }		from 'url'
import { dirname }				from 'path'
import getConfig				from './config/getConfig.js'
import getLogger				from './logging/getLogger.js'

import employeesRoutes			from './routes/employees.js'
import homeRoutes				from './routes/home.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let config		= getConfig(),
	log			= getLogger()

var app = express()

app.locals.useProductionReactJsCDN = config.www.useProductionReactJsCDN

if (config.www.redirect.www || config.www.redirect.https) {
	app.use(function (req, res, next) {
		let change_proto	= !req.secure && config.www.redirect.https,
			change_www		= req.headers.host.slice(0, 4) !== 'www.' && config.www.redirect.www

		if (change_proto || change_www) {
			let proto,
				host,
				path

			proto = change_proto ? 'https' : req.protocol
			host = change_www ? `www.${req.headers.host}` : req.headers.host
			path = req.originalUrl

			return res.redirect(301, `${proto}://${host}${path}`)
		}

		next()
	})
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/public/css',					express.static(path.join(__dirname, 'public/css')))
app.use('/public/scripts',				express.static(path.join(__dirname, 'public/scripts')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => { req.log = log; next(); });

/* routes */
[
	employeesRoutes,
	homeRoutes
].forEach(r => r(app))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.status(404).render('pages/errors/not-found')
})

// error handler
app.use(function(err, req, res, next) {
	let msg = 'A 500 HTTP error is occurring.'
	log.error(err, msg)

	// render the error page
	res.status(500)
	res.render('pages/errors/general-server')
})

export default app
