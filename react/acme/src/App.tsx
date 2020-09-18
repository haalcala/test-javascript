import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App: React.FC = () => {
	return (
		<div>
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
								<a href="">Home</a>
							</li>
							<li>
								<a href="">About</a>
							</li>
							<li>
								<a href="">Services</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			<section id="showcase">
				<div className="container">
					<h1>Affordable Professional Web Design</h1>
					<p>
						Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
						classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
						Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
						words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
						classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32
						and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
						written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
						Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
						section 1.10.32.
					</p>
				</div>
			</section>

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

			<section id="boxes">
				<div className="container">
					<div className="box">
						<img src="/img/logo_html.png" />
						<h3>HTML5 Markup</h3>
						<p>
							The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
							interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
							also reproduced in their exact original form, accompanied by English versions from the 1914
							translation by H. Rackham.
						</p>
					</div>
					<div className="box">
						<img src="/img/logo_css.png" />
						<h3>CSS3 Styling</h3>
						<p>
							The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
							interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
							also reproduced in their exact original form, accompanied by English versions from the 1914
							translation by H. Rackham.
						</p>
					</div>
					<div className="box">
						<img src="/img/logo_brush.png" />
						<h3>Graphic Design</h3>
						<p>
							The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
							interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
							also reproduced in their exact original form, accompanied by English versions from the 1914
							translation by H. Rackham.
						</p>
					</div>
				</div>
			</section>

			<footer>
				<p>Acme Web Design, Copyright &copy; 2019</p>
			</footer>
		</div>
	);
};

export default App;
