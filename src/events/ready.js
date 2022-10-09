module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`\nLogged in as ${client.user.tag}`);
	},
};
