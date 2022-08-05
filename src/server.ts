import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { connectToDatabase } from "./utilts/database";


const app = next({})
const handle = app.getRequestHandler()

async function main() {

    await connectToDatabase()
    createServer((req, res) => {
        handle(req, res, parse(req.url!, true))
    }).listen(3000,)
    console.log('Ready on http://localhost:3000')
}

app.prepare().then(main)