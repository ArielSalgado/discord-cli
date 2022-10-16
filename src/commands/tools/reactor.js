require('dotenv').config()
const { slimbot } = require('../../events/telegramMessage.js')
const { SlashCommandBuilder } = require('discord.js')
const { TELEGRAM_CHAT_ID } = process.env

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reactor')
    .setDescription('React with diferent emojis to a message'),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: 'React with the emojis',
      fetchReply: true,
    })

    const filter = (reaction, user) => {
      return reaction.emoji.name === '🤖' && user.id === interaction.user.id
    }

    const reactionMessage = 'Reaction message'

    message
      .awaitReactions({ filter, max: 1, time: 10000, errors: ['time'] })
      .then(collected => {
        if (collected.first().emoji.name === '🤖') {
          slimbot
            .sendMessage(TELEGRAM_CHAT_ID, reactionMessage)
            .then(() => {
              interaction.editReply('Message sent!')
            })
            .catch(error => {
              interaction.editReply('Error sending message!')
            })
        }
      })
      .catch(collected =>
        console.log(`After 10 seconds, no reaction was added.`)
      )
  },
}
