import './App.css';
import requests from './components/axios/requests';
import Banner from './components/banner/banner';
import RowComponent from './components/RowComponent/rowComponent';
import Navbar from './components/navBar/navbar';
function App() {
	return (
		<>
			<Navbar />
			<Banner />
			<div className="pl-2 lg:pl-6  bg-[#141414] ">
				<RowComponent
					title="NETFLIX ORIGINALS"
					fetchUrl={requests.getTrending}
					largeRow
				/>
				<RowComponent title="Trending" fetchUrl={requests.getTrending} />
				{/* <RowComponent title="Action" fetchUrl={requests.getAction} /> */}
				{/*	<RowComponent title="Adventure" fetchUrl={requests.getAdventure} />
			<RowComponent title="Animation" fetchUrl={requests.getAnimation} />
			<RowComponent title="Comedy" fetchUrl={requests.getComedy} />
			<RowComponent title="Crime" fetchUrl={requests.getCrime} />
			<RowComponent title="Documentary" fetchUrl={requests.getDocumentary} /> */}
			</div>
		</>
	);
}

export default App;
