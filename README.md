# Discord-CLI v1.0.0

This is a discord bot that allows to use the Github, Notion and Telegram APIs.  
At the moment the bot can:

#### Tools:

- Get your latency

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

Example

```bash
DISCORD_TOKEN=...
DISCORD_OWNER=...
DISCORD_BOT=...
DISCORD_GUILD=...
```

Once the .env file is created run the app using:

```bash
    $ pnpm run start
```

Or in developer mode with:

```bash
    $ pnpm run dev
```
