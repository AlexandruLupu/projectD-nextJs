import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState } from "react";

const Loading = (props) => {
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	return (
		<Backdrop open={props.loading} onClick={handleClose}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default Loading;
