import React from 'react';
import './navbar.css';
const Navbar = () => {
	const navBar = 'navBar';
	return (
		// <div className="navBar">
		<div className={`flex justify-between  ${navBar}`}>
			<div> Netlfix Logo</div>
			<div> Avatar Icon</div>
		</div>
		// </div>
	);
};
export default Navbar;
