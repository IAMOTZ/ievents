import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
