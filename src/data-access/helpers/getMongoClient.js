import { MongoClient }				from 'mongodb'

export default async function getMongoClient() {
	let client,
		connString = 'mongodb://localhost:27017/payrolladmin'

	try {
		client = await MongoClient.connect(connString)
				
	} catch (err) {
		if (client) {
			await client.close()
		}

		log.error('An error occurred while connecting to mongo db.')

		throw err
	}

	return client
}
