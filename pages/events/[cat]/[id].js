import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function EventPage({ data }) {
	const inputEmail = useRef();
	const router = useRouter();

	const [message, setMessage] = useState();

	const onSubmit = async (e) => {
		e.preventDefault();
		const emailValue = inputEmail.current.value;
		const eventId = router?.query.id;

		const validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (!emailValue.match(validRegex)) {
			setMessage("Please Introduce a correct email adress");
		}
		try {
			// FETCH REQUEST
			const response = await fetch("/api/email-registration", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: emailValue, eventId }),
			});

			if (!response.ok) throw new Error(`Error : ${response.status}`);
			const data = await response.json();
			setMessage(data.message);
			inputEmail.current.value = "";
		} catch (e) {
			console.log("ERROR", e);
		}
	};

	return (
		<div>
			<Image src={data.image} width={500} height={300} alt={data.title} />
			<h1> {data.title}</h1>
			<p>{data.description}</p>
			<form onSubmit={onSubmit}>
				<label>Get registered for this event</label>
				<input
					ref={inputEmail}
					type='email'
					id='email'
					placeholder='please insert your email'
				/>
				<button
					style={{
						backgroundColor: "blue",
						color: "white",
						fontSize: "16px",
						padding: "10px 30px",
						border: "none",
						borderRadius: "4px",
					}}>
					Submit
				</button>
			</form>
			<p>{message}</p>
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
