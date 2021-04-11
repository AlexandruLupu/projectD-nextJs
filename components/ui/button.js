import Link from "next/link";
import { Button as MuiButton } from "@material-ui/core";

function Button(props) {
	const { link, color, endIcon, size, onClick, children } = props;

	if (link) {
		return (
			<Link href={link}>
				<a>{props.children}</a>
			</Link>
		);
	}

	return (
		<MuiButton
			variant="contained"
			color={color}
			startIcon={endIcon}
			size={size}
			onClick={onClick}
		>
			{children}
		</MuiButton>
	);
}

export default Button;
