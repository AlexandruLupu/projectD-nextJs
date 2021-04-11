import PostItem from "./post-item";
import classes from "./post-list.module.css";
import NoPost from "./no-posts";

function PostsList(props) {
	const { posts, displayName } = props;

	if (posts.length === 0) {
		return <NoPost displayName={displayName} />;
	}

	return (
		<main className={classes.main}>
			{posts.map((post) => (
				<PostItem
					title={post.title}
					username={post.userName}
					image={post.image}
					key={post._id}
					description={post.description}
					comments={post.comments}
					id={post._id}
					showLink={true}
				/>
			))}
		</main>
	);
}

export default PostsList;
