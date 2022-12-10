import dotenv from "dotenv";
dotenv.config({
  debug: true,
});

const ENV_SCHEMA = {
  BOT_TOKEN: "",
};

const config = Object.assign({}, ENV_SCHEMA, process.env);

export const { BOT_TOKEN } = config