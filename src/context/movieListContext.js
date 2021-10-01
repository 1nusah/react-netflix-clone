import React, { createContext } from 'react';

export const FaveMovielistContext = createContext();
export default function FaveMovieListProvider({ children }) {
	const [favemovieList, setFaveMovie] = React.useState([
		{
			adult: false,
			backdrop_path: '/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
			genre_ids: [35, 28, 12, 878],
			original_language: 'en',
			original_title: 'Free Guy',
			poster_path: '/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg',
			vote_count: 1586,
			video: false,
			title: 'Free Guy',
			vote_average: 8,
			overview:
				'A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.',
			release_date: '2021-08-11',
			id: 550988,
			popularity: 10620.879,
			media_type: 'movie',
		},
	]);
	const addFaveMovie = (item) => {
		setFaveMovie([...favemovieList, item]);
	};
	const removeMovie = (id) => {
		setFaveMovie(favemovieList.filter((favemovie) => favemovie.id !== id));
	};
	return (
		<FaveMovielistContext.Provider
			value={{ favemovieList, addFaveMovie, removeMovie }}
		>
			{children}
		</FaveMovielistContext.Provider>
	);
}
