import React, { useState, useEffect } from 'react';
import axios from '../axios/axios';
const RowComponent = ({ title, fetchUrl, largeRow }) => {
	const [movieItem, setMovieItem] = useState([]);
	useEffect(() => {
		async function getData() {
			const req = await axios.get(fetchUrl);
			// console.log(req.data.results);
			setMovieItem(req.data.results);
		}
		getData();
	}, [fetchUrl]);

	const baseImageUrl = 'https://image.tmdb.org/t/p/original/';
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
							className={`object-cover w-full h-full  transform hover:transform hover:scale-150  hover:origin-center  duration-200 `}
							src={`${baseImageUrl}${
								largeRow ? item.poster_path : item.backdrop_path
							}`}
							alt={item.name}
						/>
					))
				)}
			</div>
			{/* </div> */}
		</div>
	);
};

export default RowComponent;
