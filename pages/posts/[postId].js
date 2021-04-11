import PostItem from "../../components/posts/post-item";
import classes from "../../styles/Post.module.css";
import { connectDatabase, getAllDocuments, getById } from "../../utils/db-util";
import Loading from "../../components/ui/dialog";
import { Fragment } from "react";
import Head from "next/head";

function PostDetailPage(props) {
	const post = props.selectedPost;

	if (!post) {
		return <Loading loading={true} />;
	}

	return (
		<Fragment>
			<Head>
				<title>{post.title}</title>
			</Head>
			<section className={classes.section}>
				<PostItem
					title={post.title}
					username={post.userName}
					image={post.image}
					key={post.id}
					description={post.description}
					comments={post.comments}
					id={post.id}
					short={false}
					articleLink={post.articleLink}
					showComm={true}
				/>
			</section>
		</Fragment>
	);
}

export async function getStaticProps(context) {
	const postId = context.params.postId;

	try {
		const client = await connectDatabase();

		const res = await getById(client, "posts", postId);

		client.close();

		if (res === null) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				selectedPost: JSON.parse(JSON.stringify(res)),
			},
			revalidate: 30,
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}

export async function getStaticPaths() {
	const client = await connectDatabase();

	const reponse = await getAllDocuments(client, "posts");

	client.close();

	const processedResponse = JSON.parse(JSON.stringify(reponse));

	const paths = processedResponse.map((post) => ({
		params: { postId: post._id },
	}));

	return {
		paths: paths,
		fallback: true,
	};
}

export default PostDetailPage;
