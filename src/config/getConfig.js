import fs						from 'fs'
import path						from 'path'
import { fileURLToPath }		from 'url'
import { dirname }				from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let config

export default function getConfig() {
	if (!config) {
		let configPath = path.join(__dirname, '..', '..', 'payrolladmin.conf')
		config = JSON.parse(fs.readFileSync(configPath))
	}

	return config
}
