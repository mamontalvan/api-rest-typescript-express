"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const repositorio_1 = __importDefault(require("./repositorio"));
const Metrica = connection_1.default.define('metricas', {
    repositorioId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: repositorio_1.default,
            key: 'id'
        }
    },
    coverage: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    bugs: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    vulnerabilities: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    hotspot: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    codeSmeell: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'code_smells',
        allowNull: false,
        defaultValue: 0,
    }
}, {
    freezeTableName: true,
});
repositorio_1.default.hasOne(Metrica);
Metrica.belongsTo(repositorio_1.default, { as: 'Repositorio', foreignKey: 'repositorioId' });
exports.default = Metrica;
//# sourceMappingURL=metrica.js.map