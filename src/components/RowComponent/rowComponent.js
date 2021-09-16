import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import axios from '../axios/axios';
const RowComponent = ({ title, fetchUrl, largeRow }) => {
	const [movieItem, setMovieItem] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');
	useEffect(() => {
		async function getData() {
			const req = await axios.get(fetchUrl);
			// console.log(req.data.results);
			setMovieItem(req.data.results);
		}
		getData();
	}, [fetchUrl]);

	const baseImageUrl = 'https://image.tmdb.org/t/p/original/';

	const handleClick = (movie) => {
		console.log('movie is', movie);
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movie?.original_title || '')
				.then((url) => {
					// console.log('url is', url);

					const urlParams = new URLSearchParams(new URL(url).search);
					// console.log('shit is ', urlParams);
					setTrailerUrl(urlParams.get('v'));
					// console.log('trailer', trailerUrl);
				})
				.catch((error) => console.error(error));
		}
	};
	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};
	return (
		<div>
			<div>
				<p className="text-gray-50 text-2xl font-semibold"> {title} </p>
			</div>
			<div
				className="py-4 gap-3"
				style={{
					display: 'grid',
					// gap: '16px',
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
							className={`object-cover w-full h-full  transform hover:transform hover:scale-150  hover:origin-center  duration-200 `}
							src={`${baseImageUrl}${
								largeRow ? item.poster_path : item.backdrop_path
							}`}
							alt={item.name}
						/>
					))
				)}
			</div>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
};

export default RowComponent;
