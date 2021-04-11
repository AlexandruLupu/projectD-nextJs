import Link from "next/link";
import { Fragment } from "react";

function CustomLink(props) {
	const { showLink, link, ariaLabel, children, className } = props;

	if (showLink) {
		return (
			<Link href={link}>
				<a className={className} aria-label={ariaLabel}>
					{children}
				</a>
			</Link>
		);
	}

	return <Fragment>{children}</Fragment>;
}

export default CustomLink;
