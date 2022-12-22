import Image from "next/image";
import Link from "next/link";
import CatEvent from "../../../src/components/events/catEvents";

function EventsPerCityPage({ data, id }) {
	return <CatEvent data={data} id={id} />;
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
