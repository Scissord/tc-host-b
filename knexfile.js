import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    client: process.env.DB_CLIENT || 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
    },
    pool: { min: 2, max: 10 }
  },
  production: {
    client: process.env.DB_CLIENT || 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
    },
    pool: { min: 2, max: 10 }
  }
};
