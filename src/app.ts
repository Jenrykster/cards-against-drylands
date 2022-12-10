import { Client, Events, GatewayIntentBits } from 'discord.js'
import { BOT_TOKEN } from '@utils/config'
import logger from '@utils/logger'

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, clientInfo => {
  logger.info(`Logged in as ${clientInfo.user.tag}`)
})

client.login(BOT_TOKEN)