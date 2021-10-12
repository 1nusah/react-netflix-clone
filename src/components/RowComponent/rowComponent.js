import React, { useState, useEffect, useContext } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { useHistory } from 'react-router-dom';

import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AddIcon from '@material-ui/icons/Add';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Dialog, IconButton } from '@material-ui/core';

import axios from '../axios/axios';
import { FaveMovielistContext } from '../../context/movieListContext';
import { FindFaveItem } from '../../utils/findFaveItem';

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
	const opts = {
		width: '100%',
		playerVars: {
			autoplay: false,
		},
	};

	const { favemovieList, addFaveMovie, removeMovie } =
		useContext(FaveMovielistContext);

	const handleMove = () => {
		addFaveMovie(selectedMovie);
	};

	const removeFaveItem = (id) => removeMovie(id);

	const index = favemovieList.findIndex((item) => selectedMovie.id === item.id);
	const history = useHistory();
	return (
		<div>
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
							<IconButton
								onClick={() => {
									history.push(`/movie/${selectedMovie.id}`, selectedMovie);
								}}
								style={{ border: '1px solid #9CA3AF' }}
							>
								<InfoOutlinedIcon className="text-gray-400" />
							</IconButton>
							{index === -1 ? (
								<IconButton
									onClick={handleMove}
									style={{ border: '1px solid #9CA3AF' }}
								>
									<FavoriteOutlinedIcon className={'text-gray-400'} />
								</IconButton>
							) : (
								<IconButton
									onClick={() => removeFaveItem(selectedMovie.id)}
									style={{ border: '1px solid #9CA3AF' }}
								>
									<FavoriteOutlinedIcon className={'text-red-400'} />
								</IconButton>
							)}
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
		</div>
	);
};

export default RowComponent;
