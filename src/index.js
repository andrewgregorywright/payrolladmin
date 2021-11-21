import app					from './app.js'
import http					from 'http'
import https				from 'https'
import getLogger			from './logging/getLogger.js'
import getConfig			from './config/getConfig.js'

// uses node.js version 12.18.3

let log						= getLogger(),
	config					= getConfig()

let useHttps = config.www.tls.key && config.www.tls.cert,
	httpServer,
	httpsServer

function setEffectiveUserAndGroupIds () {
	if (config.www.userid !== null && config.www.groupid !== null) {
		process.setegid(config.www.groupid)
		process.seteuid(config.www.userid)
	}
}

httpServer = http.createServer(app)
	.listen(config.www.ports.http, () => {
		log.info(`Listening via http on port ${config.www.ports.http}.`)
		setEffectiveUserAndGroupIds()
	})

if (useHttps) {
	httpsServer = https.createServer({
				key: config.www.tls.key,
				cert: config.www.tls.cert
			},
			app)
		.listen(config.www.ports.https, () => {
			log.info(`Listening via https on port ${config.www.ports.https}.`)
			setEffectiveUserAndGroupIds()
		})
}

process.on('warning', function (err) {
	log.warn(err, 'A warning was caught in the process.on(\'warning\') handler...')
})

process.on('SIGTERM', function () {
	let msg = `Shutting down worker process pid ${process.pid}, ` +
		'i.e. closing express server, due to SIGTERM...'
	log.info(msg)
	httpServer.close()
	if (useHttps) {
		httpsServer.close()
	}

	setTimeout(function () {
		log.info('Shutting down worker process due to SIGTERM...')
		process.exit(0)
	}, 4 * 1000)
})

httpServer.on('error', onError)
if (useHttps) {
	httpsServer.on('error', onError)
}

function onError(error) {
	if (error.syscall !== 'listen') {
		log.error(error, 'Something went wrong in index.js in the onError function.')
		throw error
	}

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error('ERROR:  You need elevated privileges to start the server.')
			log.error('ERROR:  You need elevated privileges to start the server.')
			process.exit(1)
			break;
		case 'EADDRINUSE':
			console.error('ERROR:  This port is already in use.')
			log.error('ERROR:  This port is already in use.')
			process.exit(1)
			break;
		default:
			log.error(error, 'Something went wrong in switch statement in index.js in the onError function.')
			throw error
	}
}
