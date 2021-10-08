import React from 'react';
import './App.css';
import Banner from './components/banner/banner';
import Navbar from './components/navBar/navbar';
import FaveMovieListProvider from './context/movieListContext';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	useParams,
} from 'react-router-dom';
import FaveItemsPage from './pages/faveItemsPage/FaveItemsPage';
import LandingPage from './pages/LandingPage/landingPage';
import SearchPage from './pages/searchPage';

const theme = createTheme({
	palette: {
		primary: {
			// Purple and green play nicely together.
			main: '#E50914',
		},
		secondary: {
			// This is green.A700 as hex.
			main: '#11cb5f',
		},
	},
});
function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<FaveMovieListProvider>
						<Route path="/favorites" exact component={FaveItemsPage} />
						<Route path="/" exact>
							<Navbar />
							<Banner />
							<LandingPage />
						</Route>
						<Route path="/movie/:id" exact>
							<MovieView />
						</Route>
						<Route path="/search" exact>
							<SearchPage />
						</Route>
					</FaveMovieListProvider>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;

const MovieView = () => {
	const { banner } = useParams();
	console.log('params', banner);
	return <div className="text-red-500 text-3xl">hi</div>;
};
