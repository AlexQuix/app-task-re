import {MongoClient} from "mongodb";

const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default client;