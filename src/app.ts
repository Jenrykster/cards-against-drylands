import { GatewayIntentBits } from "discord.js";
import { BOT_TOKEN } from "@utils/config";
import { DiscordClient } from "@client/discord";

const client = new DiscordClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
});

client.login(BOT_TOKEN);
