import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Tribu from './tribu';



const Organizacion = db.define('organizaciones', {
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
    }
},
{
    freezeTableName: true,
  });


export default Organizacion;