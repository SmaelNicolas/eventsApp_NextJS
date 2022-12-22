import Image from "next/image";
import Link from "next/link";

export const HomePage = ({ data }) => {
	return (
		<main>
			{data.map((place) => (
				<Link key={place.id} href={`/events/${place.id}`}>
					<Image width={200} height={100} src={place.image} />
					<h2> {place.title}</h2>
					<p>{place.description}</p>
				</Link>
			))}
		</main>
	);
};
