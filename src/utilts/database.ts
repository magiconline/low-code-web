import { Collection, MongoClient } from 'mongodb'

let collections: {
    [key: string]: Collection
} = {}

let client: MongoClient
const uri = "";

async function connectToDatabase() {
    console.log(`Start connecting to database...`)

    client = new MongoClient(uri);

    await client.connect();

    const db = client.db('lowcode');

    collections = {
        'user': db.collection('user'),
        'page': db.collection('page')
    }

    console.log(`Successfully connected to database: ${db.databaseName}`);

}

// connectToDatabase()

async function getCollection(collection: string) {
    if (!collections[collection]) {
        await connectToDatabase()
    }

    return collections[collection]
}


export { getCollection }