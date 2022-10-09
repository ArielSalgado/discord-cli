require('dotenv').config();
const { slimbot } = require('../../events/telegramMessage.js');
const { SlashCommandBuilder } = require('discord.js');
const { TELEGRAM_CHAT_ID } = process.env;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send-message')
		.setDescription('Send message to Telegram')
		.addStringOption((option) =>
			option
				.setName('message')
				.setDescription('Message to send')
				.setRequired(true)
		),
	async execute(interaction) {
		const message = interaction.options.getString('message');
		slimbot
			.sendMessage(TELEGRAM_CHAT_ID, message)
			.then(() => {
				interaction.reply('Message sent!');
			})
			.catch((error) => {
				interaction.reply('Error sending message!');
			});
	},
};
