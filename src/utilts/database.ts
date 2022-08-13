import { Collection, MongoClient, ObjectId } from 'mongodb'

// 数据模型
export class Page {
    constructor(
        public _id: ObjectId,
        public userID: string,
        public pageName: string,
        public page: Object
    ) { }
}

export class User {
    constructor(
        public _id: ObjectId,
        public username: string,
        public phone: string,
        public password: string,
        public pages: Array<ObjectId>
    ) { }
}



let collections: {
    [key: string]: Collection
} = {}

let client: MongoClient


async function connectToDatabase() {
    console.log(`Start connecting to database...`)
    const uri = "";

    client = new MongoClient(uri);

    await client.connect();

    const db = client.db('lowcode');

    collections = {
        'user': db.collection('user'),
        'page': db.collection('page')
    }

    console.log(`Successfully connected to database: ${db.databaseName}`);

}

connectToDatabase()

async function getCollection(collection: string) {
    if (collections[collection]) {
        return collections[collection]
    } else {
        throw new Error('数据库连接中，请稍后再试')
    }
}

// 开启新事务
function newSession() {
    return client.startSession()
}

export { getCollection, newSession }