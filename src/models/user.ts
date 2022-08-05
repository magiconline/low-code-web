import { ObjectId } from "mongodb";

// export default class User {
//     constructor(
//         public username: string,
//         public password: string,
//         public phone: string,
//         public _id?: ObjectId
//     ) { }
// }

export default interface User {
    username: string,
    password: string,
    phone: string,
    _id?: ObjectId
}