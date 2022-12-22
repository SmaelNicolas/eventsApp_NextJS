import fs from "fs";
import path from "path";

function buildPath() {
	return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
	const jsonData = fs.readFileSync(filePath);
	const data = JSON.parse(jsonData);
	return data;
}

export default function handler(req, res) {
	const { method } = req;

	const filePath = buildPath();
	const { event_categories, allEvents } = extractData(filePath);

	if (!allEvents) {
		return res.status(404).json({
			status: 404,
			message: "Events data not found",
		});
	}

	if (method === "POST") {
		const { email, eventId } = req.body;

		if (!email | !email.includes("@")) {
			res.status(422).json({ message: "Invalid email adress" });
			return;
		}

		const newAllEvents = allEvents.map((event) => {
			if (event.id === eventId) {
				if (event.emails_registered.includes(email)) {
					res.status(201).json({
						message: "This email has already beed registered",
					});
					return event;
				}
				return {
					...event,
					emails_registered: [...event.emails_registered, email],
				};
			}
			return event;
		});

		fs.writeFileSync(
			filePath,
			JSON.stringify({
				event_categories,
				allEvents: newAllEvents,
			})
		);

		res.status(200).json({
			message: `You has been registered succesfully with the email : ${email} to ${eventId} `,
		});
	}
}
