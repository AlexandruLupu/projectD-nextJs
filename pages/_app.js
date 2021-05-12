import "../styles/globals.css";
import Layout from "../components/layout/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import Router from "next/router";
import Loading from "../components/ui/dialog";

function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	useEffect(() => {
		const start = () => {
			setLoading(true);
		};
		const end = () => {
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

	return (
		<Layout>
			<Head>
				<title>Social Jam</title>
				<meta
					name="description"
					content="Social media website focused on news"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta charSet="utf-8" />
				{/*  <!-- Google / Search Engine Tags -->  */}
				<meta itemProp="name" content="Social Jam" />
				<meta itemProp="image" content="/images/Social-Jam-logo.png" />
				<link rel="canonical" href="https://socialjam.com/" />
			</Head>
			{loading ? <Loading loading={loading} /> : <Component {...pageProps} />}
		</Layout>
	);
}

export default MyApp;
