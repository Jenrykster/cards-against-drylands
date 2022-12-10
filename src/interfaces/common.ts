import { DiscordClient } from "@client/discord";
import {
  Awaitable,
  CacheType,
  ChatInputCommandInteraction,
  ClientEvents,
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

export interface IBotInteraction extends CommandInteraction<CacheType> {
  client: DiscordClient<true>;
}

export interface IBotEvent<T extends keyof ClientEvents> {
  name: T;
  once?: boolean;
  execute: (...args: ClientEvents[T]) => Awaitable<void>;
}
