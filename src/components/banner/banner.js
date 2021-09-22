import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/Info';
import React, { useState, useEffect } from 'react';
import axios from '../axios/axios';
import requests from '../axios/requests';
function Banner() {
	const [banner, setBanner] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.getFamily);
			const rand = Math.floor(Math.random() * request.data.results.length);
			console.log('rand is ', rand);
			setBanner(request.data.results[rand]);
			return request;
		}
		fetchData();
	}, []);
	console.log(banner);

	return (
		<header
			style={{
				backgroundSize: 'cover',
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${banner?.backdrop_path}")`,
				backgroundPosition: 'center center',
				height: '80vh',
			}}
			className="text-gray-50"
		>
			<div className="flex flex-col justify-center  w-full h-full px-4 space-y-4">
				<h1 className="text-2xl text-gray-50 sm:text-lg">
					{banner?.title || banner?.name || banner?.original_name}
				</h1>
				<div className="flex space-x-4">
					<Button
						variant="contained"
						style={{ textTransform: 'none' }}
						startIcon={<PlayArrowIcon />}
					>
						Play
					</Button>
					<Button
						variant="contained"
						style={{ textTransform: 'none', background: '#9CA3AF' }}
						startIcon={<InfoIcon />}
					>
						More Info
					</Button>
				</div>
				<p className="info">{banner?.overview}</p>
			</div>
			<div className="navBar__Banner" />
		</header>
	);
}

export default Banner;
