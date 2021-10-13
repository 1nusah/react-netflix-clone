export const API_KEY = '25dfb4e80caae3593c811d7c17de3957';

export const base_URL = 'https://api.themoviedb.org/3';
const base_URL_Bulk = 'https://api.themoviedb.org/3/movie';
// const searchLink = {`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=tears&page=1&include_adult=false}
// `}
const requests = {
	// getUpcoming: `${base_URL_Bulk}/upcoming?api_key=${API_KEY}`,
	// getPopular: `${base_URL_Bulk}/now_playing?api_key=${API_KEY}`,
	// getNowPlaying: `${base_URL_Bulk}/popular?api_key=${API_KEY}`,
	getTrending: `/trending/movie/day?api_key=${API_KEY}`,
	getAction: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	getAdventure: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
	getAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
	getComedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	getCrime: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
	getDocumentary: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	getDrama: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
	getFamily: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
	getFantasy: `/discover/movie?api_key=${API_KEY}&with_genres=14`,
	getThriller: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
	getHorror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	getRomance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	getSciFi: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
};
export default requests;
