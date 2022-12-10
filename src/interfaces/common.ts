import { DiscordClient } from "@client/discord";
import {
  Awaitable,
  CacheType,
  ChatInputCommandInteraction,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export type CommandHandler = (
  interaction: ChatInputCommandInteraction
) => Awaitable<void>;

export interface IBotCommand {
  data: SlashCommandBuilder;
  handler: CommandHandler;
}

export interface BotInteraction extends CommandInteraction<CacheType> {
  client: DiscordClient<true>;
}
