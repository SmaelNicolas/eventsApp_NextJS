import Image from "next/image";
import Link from "next/link";

function EventsPage({ data }) {
	return (
		<div>
			<h1>Events Page</h1>
			<div>
				{data.map((place) => (
					<Link key={place.id} href={`/events/${place.id}`}>
						<Image
							src={place.image}
							alt={place.title}
							width={300}
							height={150}
						/>
						<h2>{place.title}</h2>
					</Link>
				))}
			</div>
		</div>
	);
}

export default EventsPage;

export async function getStaticProps() {
	const { events_categories } = await import("/data/data.json");

	return {
		props: {
			data: events_categories,
		},
	};
}
