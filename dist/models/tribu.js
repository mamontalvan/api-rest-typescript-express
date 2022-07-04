"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const organizacion_1 = __importDefault(require("./organizacion"));
const Tribu = connection_1.default.define('tribus', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    organizacioneId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: organizacion_1.default,
            key: 'id'
        }
    },
}, {
    freezeTableName: true,
});
organizacion_1.default.hasMany(Tribu);
Tribu.belongsTo(organizacion_1.default, { as: 'Organizacion', foreignKey: 'organizacioneId' });
exports.default = Tribu;
//# sourceMappingURL=tribu.js.map