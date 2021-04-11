import PostsList from "../../components/posts/posts-list";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { connectDatabase, getAllDocuments } from "../../utils/db-util";
import UserDetails from "../../components/user/user-details";
import classes from "../../styles/UserName.module.css";
import Loading from "../../components/ui/dialog";

function User(props) {
	const { userDetails, postsByUser } = props;

	if (!userDetails) {
		return <Loading loading={true} />;
	}

	return (
		<Fragment>
			<Head>
				<title>{`${userDetails[0].userName} Posts`}</title>
				<meta
					name="description"
					content={`Find ${userDetails[0].userName}'s posts on Social Jam`}
				/>
			</Head>
			<div className={classes.main}>
				<UserDetails user={userDetails[0]} showFollow={true} />
				<PostsList
					posts={postsByUser}
					showLink={false}
					displayName={userDetails[0].displayName}
				/>
			</div>
		</Fragment>
	);
}

export async function getStaticProps(context) {
	const user = context.params.userName;

	const client = await connectDatabase();

	const postsByUser = await getAllDocuments(
		client,
		"posts",
		{ _id: -1 },
		{ "userName.userName": user }
	);

	const userDetails = await getAllDocuments(
		client,
		"users",
		{ _id: -1 },
		{ userName: user }
	);

	client.close();

	if (userDetails.length === 0) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			postsByUser: JSON.parse(JSON.stringify(postsByUser)), // silly solution, but it works. Otherwise, the _id from Mongodb will throw an error because he is an mongodb.ObjectId()
			userDetails: JSON.parse(JSON.stringify(userDetails)),
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const client = await connectDatabase();

	const response = await getAllDocuments(client, "users");

	client.close();

	const processedResponse = JSON.parse(JSON.stringify(response));

	const paths = processedResponse.map((user) => ({
		params: { userName: user.userName },
	}));

	return {
		paths: paths,
		fallback: true,
	};
}

export default User;

/* export async function getServerSideProps(context) {
	const user = context.params.userName;

	const client = await connectDatabase();

	const postsByUser = await getAllDocuments(
		client,
		"posts",
		{ _id: -1 },
		{ "userName.userName": user }
	);

	const userDetails = await getAllDocuments(
		client,
		"users",
		{ _id: -1 },
		{ userName: user }
	);

	client.close();

	return {
		props: {
			postsByUser: JSON.parse(JSON.stringify(postsByUser)),
			userDetails: JSON.parse(JSON.stringify(userDetails)),
		},
	};
}
 */
