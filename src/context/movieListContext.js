import React, { createContext } from 'react';

export const FaveMovielistContext = createContext();
export default function FaveMovieListProvider({ children }) {
	const [favemovieList, setFaveMovie] = React.useState([
		{
			adult: false,
			backdrop_path: '/9CyFLGfeDOrOOPouHp446T5MSNi.jpg',
			title: 'Hypnotic',
			genre_ids: [53, 18],
			original_language: 'en',
			original_title: 'Hypnotic',
			poster_path: '/miEj4kNc4efZ5WbPJqWl1UXWrvS.jpg',
			id: 864873,
			video: false,
			vote_average: 5.8,
			overview:
				'A young woman seeking self-improvement enlists the help of a renowned hypnotist but, after a handful of intense sessions, discovers unexpected and deadly consequences.',
			release_date: '2021-10-27',
			vote_count: 48,
			popularity: 85.652,
			media_type: 'movie',
		},
		{
			original_language: 'en',
			original_title: 'Venom: Let There Be Carnage',
			poster_path: '/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
			id: 580489,
			video: false,
			vote_average: 6.9,
			title: 'Venom: Let There Be Carnage',
			overview:
				'After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.',
			release_date: '2021-09-30',
			adult: false,
			backdrop_path: '/lNyLSOKMMeUPr1RsL4KcRuIXwHt.jpg',
			genre_ids: [878, 28],
			vote_count: 1283,
			popularity: 5783.658,
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
