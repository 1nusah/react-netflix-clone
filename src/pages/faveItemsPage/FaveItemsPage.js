import React, { useContext } from 'react';

import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { FaveMovielistContext } from '../../context/movieListContext';
export default function FaveItemsPage() {
	const { favemovieList } = useContext(FaveMovielistContext);

	console.table('fave movie list ', favemovieList);
	const baseImageUrl = 'https://image.tmdb.org/t/p/original/';

	return (
		<div className="pl-2 lg:pl-6  bg-[#141414] text-gray-50">
			<div className="p-6">
				<p className="text-2xl"> Favorite Items </p>
			</div>

			{favemovieList.map((item) => {
				return (
					<div className="flex space-x-5 p-6 ">
						<div
							style={{
								height: '40vh',
							}}
						>
							<img
								src={`${baseImageUrl}${item.poster_path}`}
								alt={item?.title}
								className="object-contain w-full h-full"
							/>
						</div>

						<div className="flex flex-col justify-center ">
							<p className="text-xl font-semibold">{item.title}</p>
							<p className="info text-base"> {item?.overview} </p>

							<div className="flex space-x-4 pt-2 ">
								<IconButton style={{ border: '1px solid #9CA3AF' }}>
									<PlayCircleFilledWhiteIcon style={{ color: '#fff' }} />
								</IconButton>
								<IconButton style={{ border: '1px solid #9CA3AF' }}>
									<AddIcon className="text-gray-400" />
								</IconButton>
								<IconButton
									// onClick={handleMove}
									style={{ border: '1px solid #F87171' }}
								>
									<FavoriteOutlinedIcon className={'text-red-400'} />
								</IconButton>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
