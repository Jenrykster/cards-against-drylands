import { Loader } from "@decorators/logger";
import { IBotCommand, IBotEvent } from "@interfaces/common";
import logger from "@utils/logger";
import { Client, ClientOptions, Collection } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

export class DiscordClient<
  Ready extends boolean = boolean
> extends Client<Ready> {
  public commands: Collection<string, IBotCommand>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.loadCommands();
    this.loadEvents();
  }

  @Loader("COMMANDS")
  private loadCommands() {
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith(".ts")
    );

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath)["default"] as IBotCommand; // All of the commands should be a default export for this to work

      if ("data" in command && "handler" in command) {
        logger.info(`Command [${command.data.name}] is ready!`);
        this.commands.set(command.data.name, command);
      } else {
        logger.error(
          `The command [${file}] is missing a required "data" or "handler" property.`
        );
      }
    }
  }

  @Loader("EVENTS")
  private loadEvents() {
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = readdirSync(eventsPath).filter((file) =>
      file.endsWith(".ts")
    );

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath)["default"];
      const castedEvent = event as IBotEvent<typeof event.name>;

      if ("name" in castedEvent && "execute" in castedEvent) {
        logger.info(`[${castedEvent.name}] event loaded !`);
        if (castedEvent.once) {
          this.once(castedEvent.name, castedEvent.execute);
        } else {
          this.on(castedEvent.name, castedEvent.execute);
        }
      } else {
        logger.error(`The event [${file}] is not configured correctly.`);
      }
    }
  }
}
