import { connectDatabase, getAllDocuments } from "../../utils/db-util";
import Filter from "../../components/user/filter-users";
import { Fragment, useState } from "react";
import UserDetails from "../../components/user/user-details";
import CustomLink from "../../components/ui/custom-link";
import classes from "../../styles/Users.module.css";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";

function Users(props) {
	const [users, setUsers] = useState(props.users); // cred ca ii useless
	const [filter, setFilter] = useState("");

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const usersToShow =
		filter.length > 0
			? users.filter((user) =>
					user.userName.toLowerCase().startsWith(filter.toLowerCase())
			  )
			: users;

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
