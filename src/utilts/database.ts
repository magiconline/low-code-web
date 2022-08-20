import { Collection, MongoClient } from 'mongodb'

let collections: {
    [key: string]: Collection
} = {}

let client: MongoClient


async function connectToDatabase() {
    console.log(`Start connecting to database...`)
    const uri = "mongodb+srv://test_user:test123456@cluster0.um9hs.mongodb.net/?retryWrites=true&w=majority";

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

// 开启新事务
function newSession() {
    return client.startSession()
}

export { getCollection, newSession }