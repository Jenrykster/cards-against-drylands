import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import { BOT_TOKEN, CLIENT_ID, GUILD_ID } from "@utils/config";
import { readdirSync } from "fs";
import { IBotCommand } from "@interfaces/common";
import logger from "@utils/logger";
import path from "path";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

const commandFiles = readdirSync(path.join(__dirname, "../commands")).filter(
  (file) => file.endsWith(".ts")
);
for (const file of commandFiles) {
  const command = require(`../commands/${file}`)["default"] as IBotCommand;
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

const deployTheComands = async () => {
  try {
    logger.info(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = (await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    )) as [];

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    logger.error(error);
  }
};

deployTheComands();
