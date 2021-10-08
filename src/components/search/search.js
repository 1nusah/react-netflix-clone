import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
	underline: {
		'&&&:before': {
			borderBottom: '#E50914',
		},
		'&&:after': {
			borderBottom: '#E50914',
		},
	},
});

const SearchComponent = () => {
	const [queryTerm, setQueryTerm] = React.useState('');
	const classes = useStyles();
	const handleQueryTerm = (e) => {
		setQueryTerm(e.target.value);
	};
	return (
		<>
			{queryTerm.length > 0 ? (
				<div className="w-full h-screen py-4  mx-auto">
					<div className=" w-4/5  py-3 flex justify-center items-center align-middle mx-auto">
						<div className="w-full mx-auto flex space-x-2 ">
							<SearchIcon color="primary" />
							<form className="w-full">
								<TextField
									autoFocus
									onChange={handleQueryTerm}
									value={queryTerm}
									placeholder="Search for a movie"
									fullWidth
									disableUnderline
									color="primary"
									className="focus:flex focus:justify-start focus:items-start focus:bg-red-400"
								/>
							</form>
						</div>
					</div>

					<div className="w-4/5 mx-auto p-4 pt-6">
						<p className="text-xl text-gray-50">
							Search Results for {queryTerm} :
						</p>
					</div>
				</div>
			) : (
				<div className="w-full h-screen py-4  flex justify-center items-center align-middle mx-auto">
					<div className="flex w-1/2 space-x-1">
						<SearchIcon color="primary" />
						<form className="w-full">
							<TextField
								autoFocus
								onChange={handleQueryTerm}
								value={queryTerm}
								placeholder="Search for a movie"
								fullWidth
								disableUnderline
								color="primary"
								className="focus:flex focus:justify-start focus:items-start focus:bg-red-400"
							/>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default SearchComponent;
