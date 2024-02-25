import React, { useEffect } from "react";

const aboutContainerStyle = {
	maxWidth: "600px",
	margin: "50px auto",
	padding: "20px",
	border: "1px solid #ccc",
	borderRadius: "8px",
	boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
	textAlign: "justify",
};

const headingStyle = {
	color: "#333",
};

const linkStyle = {
	color: "#007bff",
	textDecoration: "none",
};

const hoverLinkStyle = {
	textDecoration: "underline",
};

function AboutPage() {
	useEffect(() => {
		document.title = "About";
	}, []);

	return (
		<div style={aboutContainerStyle}>
			<h1 style={headingStyle}>About Social Network</h1>
			<p>
				Welcome to Social Network, a platform developed by{" "}
				<a href="https://github.com/403CTRLer" style={linkStyle} target="_blank" rel="noopener noreferrer">
					403CTRLer
				</a>
				.
			</p>
			<p>
				Inspired by the movie "The Social Network" (2010), our application brings people together in a virtual space.
				Connect with friends, share your thoughts, and stay updated on the latest happenings in your social circle.
			</p>
			<p>
				Join our network and experience the digital connection that transcends boundaries.
			</p>
		</div>
	);
}

export default AboutPage;
