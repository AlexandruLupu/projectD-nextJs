import {
	connectDatabase,
	insertDocument,
	getAllDocuments,
	updateDoc,
} from "../../../utils/db-util";

async function handler(req, res) {
	const userName = req.query.usersName;

	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res
			.status(500)
			.json({ message: "Connecting to database failed!", error: error });
		return;
	}

	if (req.method === "GET") {
		try {
			const document = await getAllDocuments(
				client,
				"users",
				{ _id: -1 },
				{ userName: userName }
			);
			res.status(200).json({ message: "Document retrieved", doc: document });
		} catch (error) {
			res.status(500).json({ message: "Getting user failed!" });
		}
	}

	if (req.method === "PATCH") {
		const { query, replacement } = req.body;

		let result;

		try {
			result = await updateDoc(client, "users", query, replacement);
			res.status(201).json({ message: "Update complete", result: result });
		} catch (error) {
			res.status(500).json({ message: "Updating data failed", error: error });
		}
	}

	client.close();
}

export default handler;
