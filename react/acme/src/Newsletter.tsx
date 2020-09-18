import React from "react";

const Newsletter = () => {
	return (
		<section id="newsletter">
			<div className="container">
				<h1>Scubscribe To Our Newsletter</h1>
				<form>
					<input type="email" placeholder="Please enter email ..." />
					<button type="submit" className="button_1">
						Subscribe
					</button>
				</form>
			</div>
		</section>
	);
};

export default Newsletter;
