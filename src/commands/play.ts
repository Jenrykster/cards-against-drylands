import { IBotCommand } from "@interfaces/common";
import { SlashCommandBuilder } from "discord.js";
import handler from "@handlers/play.handler";

const commandInfo = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Inicia um jogo de Cartas Contra Drylands™.");

const pingCommand: IBotCommand = {
  data: commandInfo,
  handler,
};

export default pingCommand;
