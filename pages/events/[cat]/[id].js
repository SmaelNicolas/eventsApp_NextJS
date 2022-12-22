import Image from "next/image";

function EventPage({ data }) {
	return (
		<div>
			<Image src={data.image} width={500} height={300} alt={data.title} />
			<h1> {data.title}</h1>
			<p>{data.description}</p>
		</div>
	);
}

export default EventPage;

export async function getStaticPaths() {
	const { allEvents } = await import("/data/data.json");

	const allPaths = allEvents.map((event) => {
		return {
			params: {
				cat: event.city,
				id: event.id,
			},
		};
	});

	return { paths: allPaths, fallback: false };
}

export async function getStaticProps(context) {
	const id = context.params.id;
	const { allEvents } = await import("/data/data.json");
	const eventData = allEvents.find((event) => event.id === id);

	return { props: { data: eventData } };
}
