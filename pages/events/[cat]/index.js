import Image from "next/image";

function EventsPerCityPage({ data }) {
	return (
		<div>
			<h1>Events in London</h1>
			{data.map((event) => (
				<a href={`/events/${event.city}/${event.id}`}>
					<Image
						width={300}
						height={300}
						alt={event.title}
						src={event.image}
					/>
					<h2> {event.title}</h2>
				</a>
			))}
		</div>
	);
}

export default EventsPerCityPage;

export async function getStaticPaths() {
	const { events_categories } = await import("/data/data.json");

	const allPaths = events_categories.map((event) => {
		return {
			params: {
				cat: event.id.toString(),
			},
		};
	});

	return {
		paths: allPaths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { allEvents } = await import("/data/data.json");

	const id = context?.params.cat;

	const data = allEvents.filter(
		(event) => event.city.toLowerCase() === id.toLowerCase()
	);

	return { props: { data } };
}
