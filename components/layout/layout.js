import { Fragment } from "react";
import MainHeader from "./main-header";
import Footer from "./footer";
import classes from "./layout.module.css";

function Layout(props) {
	return (
		<main className={classes.layout}>
			<MainHeader />
			<main>{props.children}</main>
			<Footer />
		</main>
	);
}

export default Layout;
