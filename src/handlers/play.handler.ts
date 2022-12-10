import {
  AwaitReactionsOptions,
  MessageReaction,
  User,
  ChatInputCommandInteraction,
} from "discord.js";
import { CommandHandler } from "@interfaces/common";
import { CLIENT_ID } from "@utils/config";
import logger from "@utils/logger";

type ReactionFilter = AwaitReactionsOptions["filter"];

const filter: ReactionFilter = (message: MessageReaction, user: User) => {
  if (message.emoji.name) {
    return ["🙋‍♂️", "▶️"].includes(message.emoji.name);
  }
  return false;
};

const startTheGame = async (
  interaction: ChatInputCommandInteraction,
  players: string[]
) => {
  logger.info("PLAYERS:", players);
  for (const player of players) {
    const user = interaction.client.users.cache.get(player);
    user?.send({
      content: "Suas cartas...",
    });
  }
};

const playUser: CommandHandler = async (interaction) => {
  const currentPlayers: string[] = [];

  const startGameMessage = await interaction.reply({
    content: "Reaja a mensagem para participar da partida !",
    fetchReply: true,
  });
  currentPlayers.push(interaction.user.id);

  const collector = startGameMessage.createReactionCollector({
    filter,
    time: 5000,
  });

  await startGameMessage.react("🙋‍♂️");
  await startGameMessage.react("▶️");

  collector.on(`collect`, async (reaction, user) => {
    if (user.id === CLIENT_ID) {
      logger.info(user.id);
      return;
    }
    if (reaction.emoji.name === "🙋‍♂️") {
      if (!currentPlayers.includes(user.id)) currentPlayers.push(user.id);
    }
    if (reaction.emoji.name === "▶️") {
      await startGameMessage.delete();
      await startTheGame(interaction, currentPlayers);
    }
  });
};

export default playUser;
