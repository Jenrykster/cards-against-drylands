import { Events, GatewayIntentBits } from "discord.js";
import { BOT_TOKEN } from "@utils/config";
import logger from "@utils/logger";
import { DiscordClient } from "@client/discord";
import { BotInteraction } from "@interfaces/common";

const client = new DiscordClient({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (clientInfo) => {
  logger.info(`Logged in as ${clientInfo.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const castedInteraction = interaction as BotInteraction;
  const command = castedInteraction.client.commands.get(
    interaction.commandName
  );

  if (!command) {
    logger.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.handler(interaction);
  } catch (error) {
    logger.error(error);
    await interaction.reply({
      content: "Não foi possível executar o comando !",
      ephemeral: true,
    });
  }
});

client.login(BOT_TOKEN);
