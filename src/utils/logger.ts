const BAR = "==========================================";

enum LOG_COLORS {
  BLUE = "\x1b[36m",
  RED = "\x1b[31m",
  YELLOW = "\x1b[33m",
  WHITE = "\x1b[37m",
}
const customLog = (color: LOG_COLORS, ...params: any) => {
  console.log(color, ...params);
};

const info = (...params: any[]) => {
  customLog(LOG_COLORS.BLUE, `INFO:`, ...params);
};

const error = (...params: any[]) => {
  if (params.length <= 2 && params[0] instanceof Error) {
    const [errorData, config] = params;

    console.log(LOG_COLORS.RED);
    console.log(BAR);
    console.log(`ERROR: ${errorData.name}`);
    console.log(`DESCRIPTION: ${errorData.message}`);
    if (!config || !config.hideStack) {
      console.log(`STACK: ${errorData.stack}`);
    }
    console.log(BAR);
  } else {
    console.error(LOG_COLORS.RED, `ERROR: `, ...params);
  }
};

const logger = {
  info,
  error,
  customLog,
  BAR,
  LOG_COLORS,
};

export default logger;
