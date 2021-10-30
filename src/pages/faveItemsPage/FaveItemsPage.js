import React, { useContext, useState } from 'react';

import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import IconButton from '@material-ui/core/IconButton';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { FaveMovielistContext } from '../../context/movieListContext';
import EmptyList from '../../assets/emptyFaveList.svg';
import movieTrailer from 'movie-trailer';
import Popover from '../../components/popover';
import { useHistory } from 'react-router';

export default function FaveItemsPage() {
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

	console.table('fave movie list ', favemovieList);
	const removeFaveItem = (id) => removeMovie(id);
	const history = useHistory();
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
						<div className="lg:flex sm:flex-row space-x-5 p-6 ">
							<div style={{ height: '40vh' }} className="">
								<img
									src={`${baseImageUrl}${item.poster_path}`}
									alt={item?.title}
									className="lg:object-contain  w-full h-full"
								/>
							</div>

							<div className="flex flex-col justify-center w-full">
								<p className="text-xl font-semibold sm:py-4 lg:py-auto">
									{item.title}
								</p>
								<p className="info text-base  hidden lg:block">
									{item?.overview}
								</p>

								<div className="flex space-x-4 py-2 ">
									<IconButton
										style={{ border: '1px solid #9CA3AF' }}
										onClick={() => handleClick(item)}
									>
										<PlayCircleFilledWhiteIcon style={{ color: '#fff' }} />
									</IconButton>
									<IconButton
										onClick={() => {
											history.push(`/movie/${item.id}`, item);
										}}
										style={{ border: '1px solid #9CA3AF' }}
									>
										<InfoOutlinedIcon className="text-gray-400" />
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
						It's so empty in here...
					</p>
				</div>
			)}

			<Popover
				open={open}
				selectedMovie={selectedMovie}
				trailerUrl={trailerUrl}
				handlePopoverClose={handlePopoverClose}
				hideButtons
			/>
		</div>
	);
}
