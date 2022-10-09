require('dotenv').config();

const { SlashCommandBuilder } = require('discord.js');
const { Octokit } = require('@octokit/rest');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign-user')
		.setDescription('Assign user to issue')
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
			option.setName('assignee').setDescription('Assignee').setRequired(true)
		),
	async execute(interaction) {
		const { GITHUB_TOKEN } = process.env;
		const owner = interaction.options.getString('owner');
		const repo = interaction.options.getString('repo');
		const issue_number = interaction.options.getString('issue-number');
		const assignee = interaction.options.getString('assignee');

		const octokit = new Octokit({
			auth: 'token ' + GITHUB_TOKEN,
		});

		const query = await octokit.request(
			`POST /repos/${owner}/${repo}/issues/${issue_number}/assignees`,
			{
				owner: owner,
				repo: repo,
				issue_number: issue_number,
				assignees: [assignee],
			}
		);

		if (query.status === 201) {
			await interaction.reply(
				`Assigned ${assignee} to issue #${issue_number} at ${query.data.html_url}`
			);
		} else {
			await interaction.reply(`Error: ${query.status}`);
		}
	},
};
