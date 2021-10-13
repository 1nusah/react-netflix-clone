import React, { useState, useEffect, useContext } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { API_KEY, base_URL } from '../axios/requests';
import axios from '../axios/axios';
import { useHistory } from 'react-router-dom';

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
	const [searchResults, setSearchResults] = React.useState([]);
	const classes = useStyles();
	const handleQueryTerm = (e) => {
		setQueryTerm(e.target.value);
	};
	const searchQuery = `${base_URL}/search/multi?query=${queryTerm}&api_key=${API_KEY}&page=1&include_adult=false`;

	useEffect(() => {
		async function getData() {
			const req = await axios.get(searchQuery);
			setSearchResults(req.data.results);
			console.log('search results', req.data.results);
		}
		getData();
	}, [queryTerm]);
	const baseImageUrl = 'https://image.tmdb.org/t/p/original/';
	const history = useHistory();
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

						<div className="grid grid-cols-5  gap-2 ">
							{searchResults.map((item) => {
								return (
									<div className="text-white col-span-1">
										<img
											className={`object-cover w-full h-full  transform hover:transform hover:scale-125  hover:origin-center  duration-200 `}
											onClick={() => {
												history.push(`/movie/${item.id}`, item);
											}}
											src={`${baseImageUrl}${item.backdrop_path}`}
											alt=" "
										/>
									</div>
								);
							})}
						</div>
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
