// this handles checking if an item is already in the faves items or not

import { useParams, useLocation } from 'react-router-dom';

export const FindFaveItem = function (faveList, selectedMovie) {
	const location = useLocation();
	return faveList.findIndex(
		(item) => location.state.id || selectedMovie.id === item.id
	);
};
