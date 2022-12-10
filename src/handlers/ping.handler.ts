import { CommandHandler } from "@interfaces/common";

const pingUser: CommandHandler = async (interaction) => {
  await interaction.reply({
    content: "🏓 Pong !",
  });
};

export default pingUser;
