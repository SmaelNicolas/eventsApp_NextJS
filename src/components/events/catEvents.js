import Image from "next/image";
import Link from "next/link";

const CatEvent = ({ data, id }) => {
	return (
		<div>
			<h1> Events in {id} </h1>
			<div>
				{data.map((event) => (
					<Link
						key={event.id}
						href={`/events/${event.city}/${event.id}`}>
						<Image
							width={300}
							height={300}
							alt={event.title}
							src={event.image}
						/>
						<h2> {event.title} </h2>
						<p> {event.description} </p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CatEvent;
