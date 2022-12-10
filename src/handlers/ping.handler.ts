import { CommandHandler } from "@interfaces/common";

const pingUser: CommandHandler = async (interaction) => {
  await interaction.reply("Pong !");
};

export default pingUser;
