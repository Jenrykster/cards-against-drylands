import logger from "@utils/logger";

export function Loader(loaderName: string) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    const method = target[name];
    return {
      ...descriptor,
      value() {
        logger.customLog(logger.LOG_COLORS.YELLOW, logger.BAR);
        logger.customLog(logger.LOG_COLORS.BLUE, `LOADING ${loaderName}`);
        method.apply(this);
        logger.customLog(
          logger.LOG_COLORS.BLUE,
          `FINISHED LOADING ${loaderName}`
        );
        logger.customLog(logger.LOG_COLORS.YELLOW, logger.BAR);
      },
    };
  };
}
