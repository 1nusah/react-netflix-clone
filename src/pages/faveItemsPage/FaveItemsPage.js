import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';

import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { Dialog } from '@material-ui/core';
import { FaveMovielistContext } from '../../context/movieListContext';
import EmptyList from '../../assets/emptyFaveList.svg';
import movieTrailer from 'movie-trailer';

export default function FaveItemsPage() {
	const [movieItem, setMovieItem] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');
	const [selectedMovie, setSelectedMovie] = useState({});

	const { favemovieList, removeMovie } = useContext(FaveMovielistContext);
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
	const opts = {
		width: '100%',
		playerVars: {
			autoplay: false,
		},
	};

	console.table('fave movie list ', favemovieList);
	const removeFaveItem = (id) => removeMovie(id);
	return (
		<div className="pl-2 lg:pl-6  bg-[#141414] text-gray-50">
			{favemovieList.length > 0 && (
				<div className="p-6">
					<p className="text-2xl"> Favorite Items </p>
				</div>
			)}
			{favemovieList.length > 0 ? (
				favemovieList.map((item) => {
					return (
						<div className="md:flex space-x-5 p-6 sm:grid sm:grid-rows-auto">
							<div
								style={{
									height: '40vh',
									backgroundColor: '#f00',
								}}
							>
								<img
									src={`${baseImageUrl}${item.poster_path}`}
									alt={item?.title}
									className="object-contain sm:object-fill w-full h-full"
								/>
							</div>

							<div className="flex flex-col justify-center sm:items-center lg:items-start  w-full ">
								<p className="text-xl font-semibold">{item.title}</p>
								<p className="info text-base  hidden lg:block">
									{item?.overview}
								</p>

								<div className="flex space-x-4 pt-2 ">
									<IconButton
										style={{ border: '1px solid #9CA3AF' }}
										onClick={() => handleClick(item)}
									>
										<PlayCircleFilledWhiteIcon style={{ color: '#fff' }} />
									</IconButton>
									<IconButton style={{ border: '1px solid #9CA3AF' }}>
										<AddIcon className="text-gray-400" />
									</IconButton>
									<IconButton
										onClick={() => removeFaveItem(item.id)}
										style={{ border: '1px solid #F87171' }}
									>
										<FavoriteOutlinedIcon className={'text-red-400'} />
									</IconButton>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<div
					className="flex flex-col justify-center items-center  mx-auto py-6 "
					style={{ width: '40%', height: '60%' }}
				>
					<img
						src={EmptyList}
						className="w-full h-full object-contain"
						alt="no empty"
					/>
					<p className="text-xl pt-4 flex justify-center items-center">
						{' '}
						It's so empty in here...
					</p>
				</div>
			)}

			<Dialog
				id="mouse-over-popover"
				fullWidth
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				onClose={handlePopoverClose}
				// disableRestoreFocus
			>
				<div style={{ backgroundColor: '#111' }}>
					{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
				</div>
				<div
					className="flex justify-between p-2"
					style={{ backgroundColor: '#111' }}
				>
					<div className="flex space-x-2  ">
						<IconButton style={{ border: '1px solid #9CA3AF' }}>
							<PlayCircleFilledWhiteIcon style={{ color: '#fff' }} />
						</IconButton>
						<IconButton style={{ border: '1px solid #9CA3AF' }}>
							<AddIcon className="text-gray-400" />
						</IconButton>

						<IconButton
							onClick={() => removeFaveItem(selectedMovie.id)}
							style={{ border: '1px solid #9CA3AF' }}
						>
							<FavoriteOutlinedIcon className={'text-red-400'} />
						</IconButton>
					</div>
					<div>
						<IconButton
							style={{ border: '1px solid #9CA3AF' }}
							onClick={handlePopoverClose}
						>
							<ClearOutlinedIcon style={{ color: '#fff' }} />
						</IconButton>
					</div>
				</div>
				<div style={{ backgroundColor: '#111' }} className=" p-2 ">
					<div className=" flex space-x-1 text-green-600">
						<p className="font-semibold">Ratings:</p>
						<p>{selectedMovie.vote_average * 10}%</p>
					</div>
				</div>
			</Dialog>
		</div>
	);
}
