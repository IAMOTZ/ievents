import dotenv from 'dotenv';

dotenv.config();
// This is the configuration for the enviroment where the app would run.
export default {
  development: {
    // Configuration for development enviroment
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    // configuration for test enviroment
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    // Configuration for production enviroment
    use_env_variable: 'DATABASE_URL',
  },
};
