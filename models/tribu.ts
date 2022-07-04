import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Organizacion from './organizacion';



const Tribu = db.define('tribus', {

    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    organizacioneId: {
        type: DataTypes.INTEGER,
        references: {
            model: Organizacion,
            key: 'id'
        }
    },


}, 
{
    freezeTableName: true,
});

Organizacion.hasMany(Tribu);
Tribu.belongsTo(Organizacion, { as: 'Organizacion', foreignKey:'organizacioneId' });



export default Tribu;