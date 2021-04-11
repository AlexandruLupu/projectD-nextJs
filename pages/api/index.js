import {
	connectDatabase,
	insertDocument,
	getAllDocuments,
} from "../../utils/db-util";

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
		const {
			title,
			description,
			userName,
			image,
			comments,
			articleLink,
		} = req.body;

		let user;

		// Get the user Id
		try {
			user = await getAllDocuments(
				client,
				"users",
				{ _id: -1 },
				{ userName: userName }
			);
		} catch (error) {
			res.status(500).json({ message: "user not found" });
		}

		const newPost = {
			title,
			description,
			userName: { ...user[0] },
			image,
			comments,
			articleLink,
		};

		let result;

		try {
			result = await insertDocument(client, "posts", newPost);
			newPost._id = result.insertedId;
			res.status(201).json({ message: "New post added", post: newPost });
		} catch (error) {
			res.status(500).json({ message: "Inserting post failed!", error: error });
		}
	}

	if (req.method === "GET") {
		try {
			const documents = await getAllDocuments(client, "posts");
			res.status(200).json({ posts: documents });
		} catch (error) {
			res.status(500).json({ message: "Getting posts failed" });
		}
	}

	client.close();
}

export default handler;
