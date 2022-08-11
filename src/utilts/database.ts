import { Collection, MongoClient } from 'mongodb'

let collections: {
    [key: string]: Collection
} = {}

async function connectToDatabase() {
    const uri = "";
    const client = new MongoClient(uri);

    await client.connect();

    const db = client.db('lowcode');

    collections = {
        'user': db.collection('user'),
        'page': db.collection('page')
    }

    console.log(`Successfully connected to database: ${db.databaseName}`);
}


export async function getCollection(collection: string) {
    if (collections[collection]) {
        return collections[collection]
    } else {
        await connectToDatabase()
        return collections[collection]
    }
}