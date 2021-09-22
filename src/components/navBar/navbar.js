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

				<div className=" w-20 h-10 ">
					<Link to="/favorites">
						<Button>Faves</Button>
					</Link>
				</div>
			</div>
			<div className="w-16 h-16 pt-2">
				<Avatar
					src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80"
					alt="profile"
					className="object-contain"
				/>
			</div>
		</div>
		// </div>
	);
};
export default Navbar;
