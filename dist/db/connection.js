"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_cockroachdb_1 = require("sequelize-cockroachdb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = new sequelize_cockroachdb_1.Sequelize(process.env.COCK_DB_CONN || '');
exports.default = db;
//# sourceMappingURL=connection.js.map