import Image from "next/image";

function EventsPage({ data }) {
	return (
		<div>
			<h1>Events Page</h1>
			<div>
				{data.map((place) => (
					<a key={place.id} href={`/events/${place.id}`}>
						<Image
							src={place.image}
							alt={place.title}
							width={300}
							height={150}
						/>
						<h2>{place.title}</h2>
					</a>
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
