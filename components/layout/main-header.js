import Link from "next/link";
import classes from "./main-header.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

function MainHeader() {
	const router = useRouter();

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<Link href="/">
					<a>
						<Image
							src="/images/Social-Jam.png"
							alt="Social Jam logo"
							width={150}
							height={39.9}
						/>
					</a>
				</Link>
			</div>
			<nav className={classes.navigation}>
				<ul>
					<li>
						<Link href="/users">
							<a
								className={router.asPath == "/users" ? `${classes.active}` : ""}
							>
								Browse
							</a>
						</Link>
					</li>
					<li>
						<Link href={"/settings"}>
							<a
								className={
									router.asPath == "/settings" ? `${classes.active}` : ""
								}
							>
								Settings
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainHeader;
