import { config as envConfig } from "dotenv";
envConfig();


interface Config{
    port:string |undefined,
    mongooseConnection:string|undefined,
    env:string|undefined,
    redisConnection:string|undefined
}

const _config:Config = {
  port: process.env.PORT,
  mongooseConnection: process.env.MONGOOSE_CONNECTION,
  env: process.env.NODE_ENV,
  redisConnection: process.env.REDIS_CONNECTION,
};

export const config = {
  get: (key:keyof Config) => {
    if (!_config[key]) {
      console.error(`Unable to get ${key} value`);
      process.exit(1);
    }
    return _config[key] as string;
  },
};
