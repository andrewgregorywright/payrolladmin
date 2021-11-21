import bunyan					from 'bunyan'
import path						from 'path'
import { fileURLToPath }		from 'url'
import { dirname }				from 'path'
import getConfig				from '../config/getConfig.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let config = getConfig()

let streams = []

if (config.logging && config.logging.stdout && config.logging.stdout.enabled) {
	streams.push({
			level: config.logging.stdout.level,
			stream: process.stdout
		})
}

if (config.logging && config.logging.file) {
	streams.push({
			level: config.logging.file.level,
			path: path.join(__dirname, '..', '..', config.logging.file.path)
		})
}

let logger = bunyan.createLogger({
	name: 'www',
	streams
})

export default function getLogger () {
	return logger
}
