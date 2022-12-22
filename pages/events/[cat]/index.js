import Image from "next/image";
import Link from "next/link";

function EventsPerCityPage({ data, id }) {
	return (
		<div>
			<h1>Events in {id}</h1>
			{data.map((event) => (
				<Link
					key={event.id}
					href={`/events/${event.city}/${event.id}`}
					passHref>
					<Image
						width={300}
						height={300}
						alt={event.title}
						src={event.image}
					/>
					<h2> {event.title}</h2>
				</Link>
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

	const data = allEvents.filter((event) => event.city === id);

	return { props: { data, id } };
}
