import React from 'react';
import './navbar.css';
import Netflix from '../../assets/netflix_icon.svg';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
const Navbar = () => {
	const navBar = 'navBar';
	return (
		// <div className="navBar">
		<div className={`flex justify-between  ${navBar}`}>
			<div className="flex space-x-3 justify-center">
				<div className="w-20 h-10 ">
					<img src={Netflix} alt="" className="object-contain" />
				</div>

				{/* <div className=" w-20 h-10 "></div> */}
			</div>
			<div className="w-16 h-16 pt-2">
				<Link to="/favorites">
					<Button style={{ color: '#E50914', fontWeight: 500 }}>Faves</Button>
				</Link>
			</div>
		</div>
		// </div>
	);
};
export default Navbar;
