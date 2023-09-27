export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongdb: process.env.MONGODB,
  port: +process.env.PORT || 3000,
  defaultLimit: +process.env.DEFAULT_LIMIT
});