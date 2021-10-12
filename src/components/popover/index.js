import React, { useState, useEffect, useContext } from 'react';

import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AddIcon from '@material-ui/icons/Add';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Dialog, IconButton } from '@material-ui/core';
import { FaveMovielistContext } from '../../context/movieListContext';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { useHistory } from 'react-router-dom';

const Popover = ({
	selectedMovie,
	hideButtons,
	trailerUrl,
	open,
	handlePopoverClose,
}) => {
	const { favemovieList, addFaveMovie, removeMovie } =
		useContext(FaveMovielistContext);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMove = () => {
		addFaveMovie(selectedMovie);
	};
	const history = useHistory();

	const opts = {
		width: '100%',
		playerVars: {
			autoplay: false,
		},
	};

	const removeFaveItem = (id) => removeMovie(id);

	const index = favemovieList.findIndex((item) => selectedMovie.id === item.id);
	return (
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
		>
			<div style={{ backgroundColor: '#111' }}>
				{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
			</div>

			<div
				className="flex justify-between p-2"
				style={{ backgroundColor: '#111' }}
			>
				<div className="flex space-x-2  ">
					{!hideButtons && (
						<>
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
						</>
					)}
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
	);
};

export default Popover;
