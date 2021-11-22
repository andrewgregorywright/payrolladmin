import fs						from 'fs'
import path						from 'path'

let config

export default function getConfig() {
	if (!config) {
		let configPath = path.join(__dirname, '..', 'payrolladmin.conf')
		config = JSON.parse(fs.readFileSync(configPath))
	}

	return config
}
