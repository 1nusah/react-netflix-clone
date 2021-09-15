import './App.css';
import requests from './components/axios/requests';
import RowComponent from './components/RowComponent/rowComponent';

function App() {
	return (
		<div style={{ paddingLeft: '5%' }}>
			<RowComponent title="Trending" fetchUrl={requests.getTrending} />
			{/* <RowComponent title="Action" fetchUrl={requests.getAction} />
			<RowComponent title="Adventure" fetchUrl={requests.getAdventure} />
			<RowComponent title="Animation" fetchUrl={requests.getAnimation} />
			<RowComponent title="Comedy" fetchUrl={requests.getComedy} />
			<RowComponent title="Crime" fetchUrl={requests.getCrime} />
			<RowComponent title="Documentary" fetchUrl={requests.getDocumentary} /> */}
		</div>
	);
}

export default App;
