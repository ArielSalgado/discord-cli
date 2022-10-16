require('dotenv').config()

const { DISCORD_TOKEN } = process.env
const { Client, Collection, GatewayIntentBits } = require('discord.js')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
})

client.commands = new Collection()
client.events = new Collection()
client.commandArray = []

client.loadEvents = client => require('./handlers/events')(client)
client.loadCommands = client => require('./handlers/commands')(client)

client.loadEvents(client)
client.loadCommands(client)

client.login(DISCORD_TOKEN)

module.exports = client
