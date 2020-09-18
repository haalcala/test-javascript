import React from "react";
import Newsletter from "./Newsletter";

const ServicesBody = () => {
	return (
		<div>
			<Newsletter />

			<section>
				<div className="container">
					<article id="main-col">
						<h1 className="page-title">Services</h1>
						<ul id="services">
							<li>
								<h3>Website Design</h3>
								<p>
									There are many variations of passages of Lorem Ipsum available, but the majority
									have suffered alteration in some form, by injected humour, or randomised words which
									don't look even slightly believable. If you are going to use a passage of Lorem
									Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of
									text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
									chunks as necessary, making this the first true generator on the Internet. It uses a
									dictionary of over 200 Latin words, combined with a handful of model sentence
									structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem
									Ipsum is therefore always free from repetition, injected humour, or
									non-characteristic words etc.
								</p>
								<p>Pricing: 1234.00</p>
							</li>
							<li>
								<h3>Website Maintenance</h3>
								<p>
									There are many variations of passages of Lorem Ipsum available, but the majority
									have suffered alteration in some form, by injected humour, or randomised words which
									don't look even slightly believable. If you are going to use a passage of Lorem
									Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of
									text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
									chunks as necessary, making this the first true generator on the Internet. It uses a
									dictionary of over 200 Latin words, combined with a handful of model sentence
									structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem
									Ipsum is therefore always free from repetition, injected humour, or
									non-characteristic words etc.
								</p>
								<p>Pricing: 1234.00</p>
							</li>
							<li>
								<h3>Website Hosting</h3>
								<p>
									There are many variations of passages of Lorem Ipsum available, but the majority
									have suffered alteration in some form, by injected humour, or randomised words which
									don't look even slightly believable. If you are going to use a passage of Lorem
									Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of
									text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
									chunks as necessary, making this the first true generator on the Internet. It uses a
									dictionary of over 200 Latin words, combined with a handful of model sentence
									structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem
									Ipsum is therefore always free from repetition, injected humour, or
									non-characteristic words etc.
								</p>
								<p>Pricing: 1234.00</p>
							</li>
						</ul>
					</article>

					<aside id="sidebar">
						<div className="dark">
							<h3>Get a quote</h3>
							<form className="quote">
								<div>
									<label>Name</label>
									<input type="text" placeholder="Name" />
								</div>
								<div>
									<label>Email</label>
									<input type="text" placeholder="Email" />
								</div>
								<div>
									<label>Message</label>
									<textarea placeholder="Message" />{" "}
								</div>
								<button className="button_1" type="submit">
									Send
								</button>
							</form>
						</div>
					</aside>
				</div>
			</section>
		</div>
	);
};

export default ServicesBody;
