import useSWR from "swr";
import { useEffect, useState, useRef } from "react";
import Loading from "../components/ui/dialog";
import Typography from "@material-ui/core/Typography";
import UserDetails from "../components/user/user-details";

// Dummy settings page, this route should be protected by auth. Here I just wanted to use SWR hook and to call the api for changes in mongoDB.
// But, there was no time left to finish this page.
//

function Settings() {
	const [currentUser, setCurrentUser] = useState();

	function userName(userName) {
		const { data, error } = useSWR(`/api/users/${userName}`);

		return {
			user: data,
			isLoading: !error && !data,
			isError: error,
		};
	}

	const { user, error, isLoading } = userName("AlexandruL");

	useEffect(() => {
		if (user) {
			setCurrentUser(user.doc[0]);
		}
	}, [user]);

	if (error) {
		return (
			<Typography variant="h6">
				Something went wrong, please try again!
			</Typography>
		);
	}

	if (isLoading) {
		return <Loading loading={isLoading} />;
	}

	return (
		<main
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				marginTop: "3rem",
			}}
		>
			<Typography variant="h5">Page under construction</Typography>
			{currentUser && <UserDetails user={currentUser} />}
		</main>
	);
}

export default Settings;
