import { IBotCommand } from "@interfaces/common";
import logger from "@utils/logger";
import { Client, ClientOptions, Collection } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

export class DiscordClient<
  Ready extends boolean = boolean
> extends Client<Ready> {
  public commands: Collection<string, IBotCommand>;

  loadCommands() {
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

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.loadCommands();
  }
}
