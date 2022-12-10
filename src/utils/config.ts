import dotenv from "dotenv";
dotenv.config({
  debug: true,
});

const ENV_SCHEMA = {
  BOT_TOKEN: "",
  GUILD_ID: "",
  CLIENT_ID: "",
  DEBUG_CHANNEL_ID: "",
  DEBUG_MODE: true,
};

const config = Object.assign({}, ENV_SCHEMA, process.env);

export const { BOT_TOKEN, GUILD_ID, CLIENT_ID, DEBUG_CHANNEL_ID, DEBUG_MODE } =
  config;
