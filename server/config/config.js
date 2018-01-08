import dotenv from 'dotenv';

dotenv.config();

const configObj = (dbName) => {
  return {
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: dbName,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
}

export default {
  development: configObj(process.env.DB_DEV_NAME),
  test: configObj(process.env.DB_TEST_NAME),
  production: { use_env_variable: 'DATABASE_URL', },
};
