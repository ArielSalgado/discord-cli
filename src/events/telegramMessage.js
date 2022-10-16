require('dotenv').config()
const Slimbot = require('slimbot')
const { EmbedBuilder, WebhookClient } = require('discord.js')
const { TELEGRAM_TOKEN, DISCORD_WEBHOOK } = process.env

const slimbot = new Slimbot(TELEGRAM_TOKEN)
const webhookClient = new WebhookClient({ url: DISCORD_WEBHOOK })

slimbot.on('message', message => {
  slimbot.sendMessage(message.chat.id, 'Mensaje enviado!')

  const embed = new EmbedBuilder()
    .setTitle(`${message.from.first_name} ${message.from.last_name}:`)
    .setDescription(message.text)
    .setColor(0x00ffff)

  webhookClient.send({
    username: 'TelegramIntegration',
    avatarURL: 'https://i.imgur.com/AfFp7pu.png',
    embeds: [embed],
  })
})

slimbot.startPolling()

module.exports = {
  slimbot,
  name: 'telegramMessage',
  async execute() {},
}
