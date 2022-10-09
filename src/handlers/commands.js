require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { getFiles, readdirSync } = require('../utils/functions');

module.exports = async (client) => {
	const { DISCORD_TOKEN, DISCORD_BOT, DISCORD_GUILD } = process.env;

	readdirSync('./src/commands').forEach((category) => {
		const commands = getFiles(`./src/commands/${category}`, '.js');

		console.log(`\nLoading ${category} commands...`);
		commands.forEach((f, i) => {
			const command = require(`../commands/${category}/${f}`);
			client.commands.set(command.data.name, command);
			client.commandArray.push(command.data.toJSON());
			console.log(`${i + 1}. ${command.data.name} loaded`);
		});
	});

	const clientID = DISCORD_BOT;
	const guildID = DISCORD_GUILD;
	const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

	try {
		console.log('\nStarted refreshing application (/) commands.');
		await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
			body: client.commandArray,
		});
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
};
