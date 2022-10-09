require('dotenv').config();

const { SlashCommandBuilder } = require('discord.js');
const { Octokit } = require('@octokit/rest');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('issue-state')
		.setDescription('Change state of and issue')
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
			option
				.setName('issue-number')
				.setDescription('Issue number')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('state')
				.setDescription('State of ths issue')
				.setRequired(true)
				.addChoices(
					{ name: 'Closed', value: 'closed' },
					{ name: 'Opened', value: 'opened' }
				)
		),
	async execute(interaction) {
		const { GITHUB_TOKEN } = process.env;
		const owner = interaction.options.getString('owner');
		const repo = interaction.options.getString('repo');
		const issue_number = interaction.options.getString('issue-number');
		const state = interaction.options.getString('state');

		const octokit = new Octokit({
			auth: 'token ' + GITHUB_TOKEN,
		});

		const query = await octokit.request(
			`PATCH /repos/${owner}/${repo}/issues/${issue_number}`,
			{
				owner: owner,
				repo: repo,
				issue_number: issue_number,
				state: state,
			}
		);

		if (query.status === 200) {
			await interaction.reply(
				`Issue #${issue_number} changed to ${state} at ${query.data.html_url}`
			);
		} else {
			await interaction.reply(`Error: ${query.status}`);
		}
	},
};
