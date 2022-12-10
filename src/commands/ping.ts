import { IBotCommand } from "@interfaces/common";
import { SlashCommandBuilder } from "discord.js";
import handler from "@handlers/ping.handler";

const commandInfo = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pings the user.");

const pingCommand: IBotCommand = {
  data: commandInfo,
  handler,
};

export default pingCommand;
