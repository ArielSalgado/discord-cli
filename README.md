# Discord-CLI v1.0.3

This is a discord bot that allows to use the Github, Notion and Telegram APIs.  
At the moment the bot can:

#### Tools:

- Get your latency
- Add a reactor for general purposes

#### Github

- Assign an user to an issue.
- Create an issue.
- Change an issue's state.

#### Telegram

- Recieve messages from Telegram
- Send messages to Telegram

#

## Installation

Download discord-cli using git clone from the repository.

```bash
  $ git clone https://github.com/ArielSalgado/discord-cli
```

Then install the dependencies.

```bash
  $ cd discord-cli
  $ pnpm i
```

To use the Telegram you need to create a webhook on your server: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks

#

## Usage/Examples

Once installed you must set the environmental varibles by creating a .env file on the root of the project.
The .env file needs the following variables:

- DISCORD_TOKEN:  
  Bot's secret token from the Discord Developers plataform.
- DISCORD_OWNER:  
  User's ID from the server owner.
- DISCORD_BOT:  
  Bot's ID in the server.
- DISCORD_GUILD:  
  Server's ID where the bot is.
- DISCORD_WEBHOOK:  
  Url of the server integrated webhook.
- GITHUB_TOKEN:  
  Github personal access token to repositories.
- TELEGRAM_TOKEN:  
  Telegram bot token.
- TELEGRAM_CHAT_ID:  
  Chat ID to private message.

Example

```bash
#Discord Tokens
DISCORD_TOKEN=...
DISCORD_OWNER=...
DISCORD_BOT=...
DISCORD_GUILD=...
DISCORD_WEBHOOK=...

#Github Tokens
GITHUB_TOKEN=...

#Telegram Tokens
TELEGRAM_TOKEN=...
TELEGRAM_CHAT_ID=...
```

Once the .env file is created run the app using:

```bash
    $ pnpm run start
```

Or in developer mode with:

```bash
    $ pnpm run dev
```
