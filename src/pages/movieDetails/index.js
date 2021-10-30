import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navBar/navbar';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { IconButton } from '@material-ui/core';
import { FaveMovielistContext } from '../../context/movieListContext';
import { FindFaveItem } from '../../utils/findFaveItem';
import movieTrailer from 'movie-trailer';

import Popover from '../../components/popover';
const MovieView = () => {
	const [trailerUrl, setTrailerUrl] = useState('');

	const location = useLocation();

	const { favemovieList, addFaveMovie, removeMovie } =
		useContext(FaveMovielistContext);
	console.log('hghghash', FindFaveItem(favemovieList));
	const index = favemovieList.findIndex(
		(item) => location.state?.id === item.id
	);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const openPopOver = () => {
		setAnchorEl(true);
		console.log('movie is', location.state);
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(location.state?.original_title || '')
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch((error) => console.error(error));
		}
	};
	return (
		<div
			style={{
				backgroundSize: 'cover',
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${location.state?.backdrop_path}")`,
				backgroundPosition: 'center center',
				height: '100%',
			}}
			className="backdrop-filter backdrop-invert"
		>
			<div className="pb-10 ">
				<Navbar />
			</div>

			<div className=" lg:pl-4 lg:space-x-3 lg:flex sm:flex-row  pt-12 ">
				<div className=" lg:w-1/5 lg:h-1/5 sm:w-3/5 sm:h-auto">
					<img
						src={`https://image.tmdb.org/t/p/original/${location.state?.poster_path}`}
						alt=" "
						className="rounded-md"
					/>
				</div>
				<div className="lg:w-3/5 sm:w-full my-auto bg-black bg-opacity-30 lg:px-2">
					<p className="text-white text-2xl">
						{location.state?.original_title}
					</p>

					<div className="flex space-x-2 py-2  text-white text-sm ">
						<p>Horror </p>
						<p>Thriller</p>

						<p>Mystery</p>
					</div>

					<div>
						<p className="text-white text-xl py-2  ">Overview</p>

						<p className="text-white text-base py-2 ">
							{location.state?.overview}
						</p>
					</div>

					<div className="flex justify-between p-2">
						<div className="flex space-x-2    ">
							<IconButton
								style={{ border: '1px solid #9CA3AF' }}
								onClick={openPopOver}
							>
								<PlayCircleFilledWhiteIcon style={{ color: '#fff' }} />
							</IconButton>

							{index === -1 ? (
								<IconButton
									onClick={() => addFaveMovie(location.state)}
									style={{ border: '1px solid #9CA3AF' }}
								>
									<FavoriteOutlinedIcon className={'text-gray-400'} />
								</IconButton>
							) : (
								<IconButton
									onClick={() => removeMovie(location.state.id)}
									style={{ border: '1px solid #9CA3AF' }}
								>
									<FavoriteOutlinedIcon className={'text-red-400'} />
								</IconButton>
							)}
						</div>
					</div>
				</div>
			</div>
			<Popover
				open={open}
				selectedMovie={location.state}
				trailerUrl={trailerUrl}
				handlePopoverClose={handlePopoverClose}
				hideButtons
			/>
		</div>
	);
};

export default MovieView;
