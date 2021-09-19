import React, { useState, useEffect, useContext } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AddIcon from '@material-ui/icons/Add';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../axios/axios';
import { Dialog, IconButton } from '@material-ui/core';
import { FaveMovielistContext } from '../../context/movieListContext';
const RowComponent = ({ title, fetchUrl, largeRow }) => {
	const [movieItem, setMovieItem] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');
	const [selectedMovie, setSelectedMovie] = useState({});
	useEffect(() => {
		async function getData() {
			const req = await axios.get(fetchUrl);
			// console.log(req.data.results);
			setMovieItem(req.data.results);
		}
		getData();
	}, [fetchUrl]);

	const baseImageUrl = 'https://image.tmdb.org/t/p/original/';

	const useStyles = makeStyles((theme) => ({
		popover: {
			pointerEvents: 'none',
		},
		paper: {
			padding: theme.spacing(1),
		},
	}));

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

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
		// height: '100%',
		width: '100%',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: false,
		},
	};

	const { favemovieList, addFaveMovie, removeMovie } =
		useContext(FaveMovielistContext);
	console.log('shit is', favemovieList);
	console.log('ss', selectedMovie);

	const handleMove = () => {
		addFaveMovie(selectedMovie);
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
					// className={classes.popover}
					// classes={{
					// 	paper: classes.paper,
					// }}
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
								onClick={handleMove}
								style={{ border: '1px solid #9CA3AF' }}
							>
								<FavoriteOutlinedIcon className="text-gray-400" />
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
		</div>
	);
};

export default RowComponent;
