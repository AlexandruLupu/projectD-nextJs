import CustomLink from "../ui/custom-link";
import classes from "./footer.module.css";

function Footer() {
	return (
		<footer className={classes.footer}>
			{"Copyright © "} {new Date().getFullYear()}{" "}
			<CustomLink link={"/"} showLink={true}>
				<span className={classes.link}> Social Jam</span>
			</CustomLink>
			{"Created with love by Alexandru Lupu"}
		</footer>
	);
}

export default Footer;
