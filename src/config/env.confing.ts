export const EnvConfiguration = () => ({
  environment: process.env.NODE_DEV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3005,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7,
});
