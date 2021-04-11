import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import classes from "./post-list.module.css";

function NoPost(props) {
	const { displayName } = props;
	return (
		<main className={classes.noPost}>
			<Image
				src="/images/Social-Jam.png"
				alt="Social Jam logo"
				width={150}
				height={40}
			/>
			<Typography
				variant="h6"
				style={{ maxWidth: "500px" }}
			>{`It seems that ${displayName} hasn't shared anything on Social Jam`}</Typography>
		</main>
	);
}

export default NoPost;
