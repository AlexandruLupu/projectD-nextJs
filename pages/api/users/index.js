import {
	connectDatabase,
	insertDocument,
	getAllDocuments,
	replaceOne,
} from "../../../utils/db-util";

async function handler(req, res) {
	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res
			.status(500)
			.json({ message: "Connecting to database failed!", error: error });
		return;
	}

	if (req.method === "POST") {
		const { userName, displayName, imageUrl, following } = req.body;

		const newUser = {
			userName,
			displayName,
			imageUrl,
			following,
		};

		let result;

		try {
			result = await insertDocument(client, "users", newUser);
			newUser._id = result.insertedId;
			res.status(201).json({ message: "New user added", user: newUser });
		} catch (error) {
			res.status(500).json({ message: "Inserting user failed", error: error });
		}
	}

	if (req.method === "GET") {
		try {
			const documents = await getAllDocuments(client, "users", { _id: -1 });
			res.status(200).json({ message: documents });
		} catch (error) {
			res.status(500).json({ message: "Getting users failed!" });
		}
	}

	client.close();
}

export default handler;
