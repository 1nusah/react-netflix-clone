import React, { createContext } from 'react';

export const FaveMovielistContext = createContext();
export default function FaveMovieListProvider({ children }) {
	const [favemovieList, setFaveMovie] = React.useState([]);
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
