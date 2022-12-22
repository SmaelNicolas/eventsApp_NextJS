import Link from "next/link";
import React from "react";

export const Header = () => {
	return (
		<header>
			<nav>
				<img />
				<Link href='/'>Home</Link>
				<Link href='/events'>Events</Link>
				<Link href='/about-us'>About Us</Link>
			</nav>
		</header>
	);
};
