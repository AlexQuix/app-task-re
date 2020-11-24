import {MongoClient, Collection, Db} from "mongodb";

const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let collections: Promise<Collection[]> = new Promise(async (resolve)=>{
    await client.connect().catch(e => console.log(e));
    let db:Db = client.db("app-task");
    console.log('DataBase conected in the port: ', process.env.MONGODB_URI);

    let tasks = db.collection('tasks');
    let notebooks = db.collection('notebooks');
    resolve([tasks, notebooks]);
});

export default collections;