import { IBotEvent } from "@interfaces/common";
import logger from "@utils/logger";
import { Events } from "discord.js";

const readyEvent: IBotEvent<Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  execute: (client) => {
    logger.info(`Logged in as ${client.user.tag}`);
  },
};

export default readyEvent;
