import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import classes from "./user-details.module.css";
import Button from "../ui/button";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useState } from "react";
import { useRouter } from "next/router";
import Skeleton from "@material-ui/lab/Skeleton";

function UserDetails(props) {
	const { user, showFollow } = props;

	const router = useRouter();
	const userName = router.query.userName;

	const [userState, setUserState] = useState(user);

	function followHandler() {
		fetch(`/api/users/${userName}`, {
			method: "PATCH",
			body: JSON.stringify({
				query: {
					userName: userState.userName,
				},
				replacement: {
					displayName: userState.displayName,
					imageUrl: userState.imageUrl,
					userName: userState.userName,
					following: !userState.following,
				},
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => setUserState(data.result.ops[0]));
	}

	return (
		<aside>
			<Card className={classes.card}>
				<CardHeader
					avatar={
						// For some reason reloading this component will briefly (0.1s) will flicker the user image - Fixed after styling on server-side
						userState.imageUrl ? (
							<Avatar
								aria-label="User image"
								src={userState.imageUrl}
								style={{ height: "56px", width: "56px" }}
							></Avatar>
						) : (
							<Skeleton variant="circle">
								<Avatar />
							</Skeleton>
						)
					}
					title={`@${userState.userName}`}
				/>
				<CardContent>
					<Typography variant="h6">{userState.displayName}</Typography>
				</CardContent>
				{showFollow ? (
					<CardActions>
						<Button
							color="primary"
							size="small"
							endIcon={
								userState.following ? <FavoriteIcon /> : <FavoriteBorderIcon />
							}
							onClick={followHandler}
						>
							{userState.following ? "Following" : "Follow"}
						</Button>
					</CardActions>
				) : (
					""
				)}
			</Card>
		</aside>
	);
}

export default UserDetails;
