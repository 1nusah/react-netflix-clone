import React, { useState, useEffect, useContext } from 'react';
import movieTrailer from 'movie-trailer';

import axios from '../axios/axios';
import { FaveMovielistContext } from '../../context/movieListContext';

import Popover from '../popover';

const RowComponent = ({ title, fetchUrl, largeRow }) => {
	const [movieItem, setMovieItem] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');
	const [selectedMovie, setSelectedMovie] = useState({});
	useEffect(() => {
		async function getData() {
			const req = await axios.get(fetchUrl);
			setMovieItem(req.data.results);
		}
		getData();
	}, [fetchUrl]);

	const baseImageUrl = 'https://image.tmdb.org/t/p/original/';

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const handleClick = (movie) => {
		setAnchorEl(true);
		setSelectedMovie(movie);
		console.log('movie is', movie);
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movie?.original_title || '')
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch((error) => console.error(error));
		}
	};

	const { favemovieList, addFaveMovie, removeMovie } =
		useContext(FaveMovielistContext);

	return (
		<div className="z-50">
			<div>
				<p className="text-gray-50 text-2xl font-semibold"> {title} </p>
			</div>

			<div
				className="py-4"
				style={{
					display: 'grid',
					gap: '2%',
					gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))',
					gridAutoFlow: 'column',
					gridAutoColumns: 'minmax(160px,1fr',
					overflowX: 'auto',
				}}
			>
				{React.Children.toArray(
					movieItem.map((item) => (
						<img
							onClick={() => handleClick(item)}
							aria-owns={open ? 'mouse-over-popover' : undefined}
							aria-haspopup="true"
							// onMouseEnter={handlePopoverOpen}
							// onMouseLeave={handlePopoverClose}
							className={`object-cover w-full h-full  transform hover:transform hover:scale-150  hover:origin-center  duration-200 `}
							src={`${baseImageUrl}${
								largeRow ? item.poster_path : item.backdrop_path
							}`}
							alt={item.name}
						/>
					))
				)}

				<Popover
					open={open}
					selectedMovie={selectedMovie}
					trailerUrl={trailerUrl}
					handlePopoverClose={handlePopoverClose}
				/>
			</div>
		</div>
	);
};

export default RowComponent;
