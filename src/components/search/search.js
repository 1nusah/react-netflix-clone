import React from 'react';
import {
	TextField,
	InputAdornment,
	FormControl,
	InputLabel,
	Grid,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchComponent = () => {
	return (
		<div className="flex flex-col items-center justify-center ">
			<div className="text-gray-300">search bar in this bitch</div>
			{/* <FormControl>
				<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
				<TextField
					label="Search for any movie"
					id="standard-start-adornment"
					classes={{ root: 'text-[#E50914]' }}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</FormControl> */}

			<Grid container spacing={1} alignItems="flex-end">
				<Grid item>
					<SearchIcon />
				</Grid>
				<Grid item>
					<TextField id="input-with-icon-grid" label="With a grid" />
				</Grid>
			</Grid>
		</div>
	);
};

export default SearchComponent;
