import { GatewayIntentBits } from "discord.js";
import { BOT_TOKEN } from "@utils/config";
import { DiscordClient } from "@client/discord";

const client = new DiscordClient({ intents: [GatewayIntentBits.Guilds] });

client.login(BOT_TOKEN);
