const BAR = "==========================================";
const INFO_COLOR_PREFIX = "\x1b[36m";
const ERROR_COLOR_PREFIX = "\x1b[31m";

const info = (...params: any[]) => {
  console.info(`${INFO_COLOR_PREFIX}INFO:`, ...params);
};

const error = (...params: any[]) => {
  if (params.length <= 2 && params[0] instanceof Error) {
    const [errorData, config] = params;

    console.log(ERROR_COLOR_PREFIX);
    console.log(BAR);
    console.log(`ERROR: ${errorData.name}`);
    console.log(`DESCRIPTION: ${errorData.message}`);
    if (!config || !config.hideStack) {
      console.log(`STACK: ${errorData.stack}`);
    }
    console.log(BAR);
  } else {
    console.error(`${ERROR_COLOR_PREFIX}ERROR: `, ...params);
  }
};

const logger = {
  info,
  error,
  BAR,
};

export default logger;
