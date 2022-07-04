"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_cockroachdb_1 = require("sequelize-cockroachdb");
const tribu_1 = __importDefault(require("./tribu"));
const Repositorio = connection_1.default.define('repositorios', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'E'
    },
    createTime: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: 'create_time',
        defaultValue: sequelize_cockroachdb_1.Sequelize.fn('NOW')
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'A'
    },
    tribuId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tribu_1.default,
            key: 'id'
        }
    },
}, {
    freezeTableName: true,
});
Repositorio.belongsTo(tribu_1.default, { as: 'Tribu', foreignKey: 'tribuId' });
// Repositorio.sync({
//     force: true,
// }).then(() => {
//     console.log('hola mundo');
// })
// .catch(function(err) {
//     console.error("error: " + err.message);
//     process.exit(1);
// });
exports.default = Repositorio;
//# sourceMappingURL=repositorio%20copy.js.map