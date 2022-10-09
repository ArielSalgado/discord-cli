const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("Return the bot's ping"),
	async execute(interaction, client) {
		const message = await interaction.deferReply({
			fetchReply: true,
		});

		const reply = `API Latency: ${client.ws.ping}ms\nClient Ping: ${
			message.createdTimestamp - interaction.createdTimestamp
		}ms`;

		await interaction.editReply({
			content: reply,
		});
	},
};
