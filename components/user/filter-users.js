import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const Filter = (props) => {
	const { handleFilterChange } = props;
	return (
		<form>
			<TextField
				id="search"
				label="Search"
				type="search"
				variant="outlined"
				size="small"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
				onChange={handleFilterChange}
			/>
		</form>
	);
};

export default Filter;
