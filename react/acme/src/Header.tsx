import React from "react";
import PropTypes from "prop-types";

const Header = () => {
	return (
		<header>
			<div className="container">
				<div id="branding">
					<h1>
						<span className="highlight">Acme</span> Web Design
					</h1>
				</div>
				<nav>
					<ul>
						<li className="current">
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/about">About</a>
						</li>
						<li>
							<a href="/services">Services</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

Header.propTypes = {};

export default Header;
