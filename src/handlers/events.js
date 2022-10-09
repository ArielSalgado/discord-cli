const { getFiles } = require('../utils/functions');

module.exports = async (client, reload) => {
	const events = getFiles('./src/events', '.js');

	if (events.length === 0) console.log('No events to load');

	console.log('Loading events...');
	events.forEach((f, i) => {
		const event = require(`../events/${f}`);

		if (event.once)
			client.once(event.name, (...args) => event.execute(...args, client));
		else client.on(event.name, (...args) => event.execute(...args, client));

		client.events.set(event.name, event);
		console.log(`${i + 1}. ${event.name} loaded`);
	});
};
