import { IBotEvent, IBotInteraction } from "@interfaces/common";
import { DEBUG_CHANNEL_ID, DEBUG_MODE } from "@utils/config";
import logger from "@utils/logger";
import { Events } from "discord.js";

const readyEvent: IBotEvent<Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const castedInteraction = interaction as IBotInteraction;

    if (DEBUG_MODE && interaction.channelId !== DEBUG_CHANNEL_ID) {
      await interaction.reply({
        content:
          "Não posso rodar comandos fora do canal designado para testes no momento, malz ae.",
        ephemeral: true,
      });
      return;
    }

    const command = castedInteraction.client.commands.get(
      interaction.commandName
    );

    if (!command) {
      logger.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      logger.customLog(logger.LOG_COLORS.WHITE, "COMMAND:", {
        name: interaction.commandName,
        userWhoRequested: interaction.user.tag,
      });
      await command.handler(interaction);
    } catch (error) {
      logger.error(error);
      await interaction.reply({
        content: "Não foi possível executar o comando !",
        ephemeral: true,
      });
    }
  },
};

export default readyEvent;
