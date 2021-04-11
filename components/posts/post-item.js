import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import Link from "next/link";
import CustomLink from "../../components/ui/custom-link";
import Badge from "@material-ui/core/Badge";
import classes from "./post-item.module.css";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import { Fragment, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Loading from "../../components/ui/dialog";

function PostItem(props) {
	const {
		title,
		username,
		image,
		description,
		comments,
		id,
		showLink,
		articleLink,
		showComm,
	} = props;

	if (!title) {
		return <Loading Loading={true} />;
	}

	const [expanded, setExpanded] = useState(showComm);

	const initials = username.displayName
		? username.displayName
				.split(" ")
				.map((s) => s[0])
				.join("")
		: "";

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<article>
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Avatar
							aria-label="Users Initials"
							style={{ backgroundColor: "#0071ad" }}
						>
							<CustomLink
								link={`/users/${username.userName}/`}
								showLink={showLink}
								ariaLabel="Link to User"
							>
								{initials}
							</CustomLink>
						</Avatar>
					}
					title={
						<CustomLink
							link={`/posts/${id}`}
							showLink={showLink}
							ariaLabel="Link to Post"
						>
							{title}
						</CustomLink>
					}
					subheader={
						<Link href={`/users/${username.userName}/`}>
							{username.displayName}
						</Link>
					}
				/>
				<CustomLink link={`/posts/${id}`} showLink={showLink}>
					<CardMedia className={classes.media} image={image} title={title} />
				</CustomLink>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{showLink ? description.substring(0, 200) + "..." : description}
					</Typography>
				</CardContent>
				<CardActions className={classes.actions}>
					{!articleLink ? (
						<CustomLink link={`/posts/${id}`} showLink={showLink}>
							<Button
								size="small"
								color="primary"
								href={articleLink}
								aria-label="show more"
							>
								Show More
							</Button>
						</CustomLink>
					) : articleLink.length > 1 ? (
						<a
							href={articleLink}
							target="_blank"
							className={classes.showMoreLink}
						>
							{/* 	{`From: ${articleLink.substring(0, 40)} ...`} */}
							{articleLink.slice(8, articleLink.lastIndexOf(".com") + 4)}
						</a>
					) : (
						<div>{"  "}</div>
					)}

					<Badge
						badgeContent={comments.length}
						color="primary"
						className={classes.badge}
						onClick={handleExpandClick}
					>
						<InsertCommentIcon />
					</Badge>
					<IconButton
						className={`${classes.expand} ${
							expanded ? classes.expandOpen : ""
						}`}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show comments"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<List>
							{comments.map((comment, index) => (
								<Fragment key={index}>
									<ListItem>
										<ListItemText
											primary={comment.displayName}
											secondary={comment.comment}
										/>
									</ListItem>
									<Divider variant="middle" />
								</Fragment>
							))}
						</List>
					</CardContent>
				</Collapse>
			</Card>
		</article>
	);
}

export default PostItem;
