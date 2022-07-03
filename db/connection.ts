import { Sequelize } from 'sequelize-cockroachdb';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize( process.env.COCK_DB_CONN || '' );

export default db;