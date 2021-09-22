import React from 'react';
import './App.css';
import Banner from './components/banner/banner';
import Navbar from './components/navBar/navbar';
import FaveMovieListProvider from './context/movieListContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FaveItemsPage from './pages/faveItemsPage/FaveItemsPage';
import LandingPage from './pages/LandingPage/landingPage';
function App() {
	return (
		<>
			<Router>
				<Switch>
					<FaveMovieListProvider>
						<Route path="/favorites" exact component={FaveItemsPage} />
						<Route path="/" exact>
							<Navbar />
							<Banner />
							<LandingPage />
						</Route>
					</FaveMovieListProvider>
				</Switch>
			</Router>
		</>
	);
}

export default App;
