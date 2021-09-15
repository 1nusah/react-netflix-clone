import React, { useState, useEffect } from 'react';
import axios from '../axios/axios';
const RowComponent = ({ title, fetchUrl }) => {
	const [movieItem, setMovieItem] = useState([]);
	useEffect(() => {
		async function getData() {
			const req = await axios.get(fetchUrl);
			console.log(req.data.results);
			setMovieItem(req.data.results);
		}
		getData();
	}, [fetchUrl]);

	const baseImageUrl = 'https://image.tmdb.org/t/p/original/';
	return (
		<div>
			<div>
				<p> {title} </p>
			</div>
			{/* <div className="flex h-48  space-x-3 overflow-auto"> */}
			<div
				className="py-4"
				style={{
					display: 'grid',
					gap: '16px',
					gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))',
					gridAutoFlow: 'column',
					gridAutoColumns: 'minmax(160px,1fr',
					overflowX: 'auto',
				}}
			>
				{React.Children.toArray(
					movieItem.map((item) => (
						<img
							className="object-contain w-full h-full "
							src={`${baseImageUrl}${item.poster_path}`}
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
