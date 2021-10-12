import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../../components/navBar/navbar';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AddIcon from '@material-ui/icons/Add';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { Dialog, IconButton } from '@material-ui/core';
import { FaveMovielistContext } from '../../context/movieListContext';
import { FindFaveItem } from '../../utils/findFaveItem';
const MovieView = () => {
	const banner = useParams();
	const location = useLocation();

	console.log('params', banner);
	console.log('locaiton sit', location.state);
	const { favemovieList, addFaveMovie, removeMovie } =
		useContext(FaveMovielistContext);
	console.log('hghghash', FindFaveItem(favemovieList));
	const index = favemovieList.findIndex(
		(item) => location.state?.id === item.id
	);
	return (
		<div
			style={{
				backgroundSize: 'cover',
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${location.state?.backdrop_path}")`,
				backgroundPosition: 'center center',
				height: '100vh',
			}}
			className="backdrop-filter backdrop-invert"
		>
			<div className="pb-10">
				<Navbar />
			</div>

			<div className=" pl-4 space-x-3 flex pt-10 ">
				<div className="w-1/5 h-1/5">
					<img
						src={`https://image.tmdb.org/t/p/original/${location.state?.poster_path}`}
						alt=" "
						className="rounded-md"
					/>
				</div>
				<div className="w-3/5 my-auto  ">
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
							<IconButton style={{ border: '1px solid #9CA3AF' }}>
								<PlayCircleFilledWhiteIcon style={{ color: '#fff' }} />
							</IconButton>

							{index === -1 ? (
								<IconButton
									// onClick={handleMove}
									style={{ border: '1px solid #9CA3AF' }}
								>
									<FavoriteOutlinedIcon className={'text-gray-400'} />
								</IconButton>
							) : (
								<IconButton
									// onClick={() => removeFaveItem(selectedMovie.id)}
									style={{ border: '1px solid #9CA3AF' }}
								>
									<FavoriteOutlinedIcon className={'text-red-400'} />
								</IconButton>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieView;