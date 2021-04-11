import PostsList from "../components/posts/posts-list";
import { connectDatabase, getAllDocuments } from "../utils/db-util";
import Loading from "../components/ui/dialog";
import { Fragment } from "react";

export default function HomePage(props) {
	const { posts } = props;

	if (!posts) {
		return <Loading loading={true} />;
	}

	return (
		<Fragment>
			<PostsList posts={posts} showLink={true} />
		</Fragment>
	);
}

export async function getStaticProps() {
	try {
		const client = await connectDatabase();

		const reponse = await getAllDocuments(client, "posts");

		client.close();

		return {
			props: { posts: JSON.parse(JSON.stringify(reponse)) },
			revalidate: 1,
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}
