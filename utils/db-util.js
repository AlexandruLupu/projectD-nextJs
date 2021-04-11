import { MongoClient } from "mongodb";
const mongodb = require("mongodb");

export async function connectDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uujki.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);

	return client;
}

export async function getAllDocuments(client, collection, sort, filter) {
	const db = client.db();

	const documents = await db
		.collection(collection)
		.find(filter)
		.sort(sort)
		.toArray();

	return documents;
}

export async function getById(client, collection, filter) {
	const db = client.db();
	const id = new mongodb.ObjectID(filter);
	const query = { _id: id };

	const options = {
		sort: { id: -1 },
	};

	const doc = await db.collection(collection).findOne(query, options);

	return doc;
}

export async function insertDocument(client, collection, document) {
	const db = client.db();

	const result = await db.collection(collection).insertOne(document);

	return result;
}

export async function updateDoc(client, collection, query, replacement) {
	const db = client.db();

	const options = {
		upsert: false, // don't create a new doc if no docs match the query
	};

	const result = await db
		.collection(collection)
		.replaceOne(query, replacement, options);

	return result;
}
