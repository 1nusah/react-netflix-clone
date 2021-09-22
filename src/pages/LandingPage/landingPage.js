import React from 'react';
import RowComponent from '../../components/RowComponent/rowComponent';
import requests from '../../components/axios/requests';

export default function LandingPage() {
	return (
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
	);
}
