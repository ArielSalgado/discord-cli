require('dotenv').config();

const { SlashCommandBuilder } = require('discord.js');
const { Octokit } = require('@octokit/rest');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-issue')
		.setDescription('Create an issue')
		.addStringOption((option) =>
			option
				.setName('owner')
				.setDescription('Owner of the repository')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('repo').setDescription('Repository name').setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('title').setDescription('Issue title').setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('body').setDescription('Issue body')
		)
		.addStringOption((option) =>
			option.setName('label').setDescription('Issue label')
		),
	async execute(interaction) {
		const { GITHUB_TOKEN } = process.env;
		const owner = interaction.options.getString('owner');
		const repo = interaction.options.getString('repo');
		const title = interaction.options.getString('title');
		const body = interaction.options.getString('body');
		const label = interaction.options.getString('label');

		const octokit = new Octokit({
			auth: 'token ' + GITHUB_TOKEN,
		});

		const query = await octokit.request(`POST /repos/${owner}/${repo}/issues`, {
			owner: owner,
			repo: repo,
			title: title,
			body: body,
			labels: [label],
		});

		if (query.status === 201) {
			await interaction.reply(
				`Issue ${title} created at ${query.data.html_url}`
			);
		} else {
			await interaction.reply(`Error: ${query.status}`);
		}
	},
};
