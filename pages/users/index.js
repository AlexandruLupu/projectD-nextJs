import { connectDatabase, getAllDocuments } from "../../utils/db-util";
import Filter from "../../components/user/filter-users";
import { Fragment, useState, useEffect } from "react";
import UserDetails from "../../components/user/user-details";
import CustomLink from "../../components/ui/custom-link";
import classes from "../../styles/Users.module.css";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import Loading from "../../components/ui/dialog";
import Router from "next/router";

function Users(props) {
	const { users } = props;
	const [filter, setFilter] = useState("");
	const [loading, setLoading] = useState(false);

	const handleFilterChange = (event) => {
		const search = event.target.value;
		setFilter(search);
	};

	useEffect(() => {
		const start = () => {
			console.log("started");
			setLoading(true);
		};

		const end = () => {
			console.log("finished");
			setLoading(false);
		};

		Router.events.on("routeChangeStart", start);
		Router.events.on("routeChangeComplete", end);
		Router.events.on("routeChangeError", end);
		return () => {
			Router.events.off("routeChangeStart", start);
			Router.events.off("routeChangeComplete", end);
			Router.events.off("routeChangeError", end);
		};
	}, []);

	const usersToShow =
		filter.length > 0
			? users.filter((user) =>
					user.userName.toLowerCase().startsWith(filter.toLowerCase())
			  )
			: users;

	if (loading) {
		return <Loading loading={loading} />;
	}

	console.log(loading);

	return (
		<Fragment>
			<Head>
				<title>Social Jam - Browse</title>
				<meta name="description" content="Find Social Jam users" />
			</Head>
			<main className={classes.main}>
				<section style={{ margin: "1rem" }}>
					<Filter handleFilterChange={handleFilterChange} />
				</section>
				<section className={classes.list}>
					{usersToShow.length === 0 ? (
						<Typography variant="h6">No users found!</Typography>
					) : (
						""
					)}
					{usersToShow.map((user) => (
						<CustomLink
							key={user._id}
							link={`/users/${user.userName}`}
							showLink={true}
						>
							<UserDetails
								user={user}
								showFollow={false}
								className={classes.card}
							/>
						</CustomLink>
					))}
				</section>
			</main>
		</Fragment>
	);
}

export async function getServerSideProps() {
	const client = await connectDatabase();

	const users = await getAllDocuments(client, "users");

	client.close();

	if (!users) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			users: JSON.parse(JSON.stringify(users)),
		},
	};
}

export default Users;
