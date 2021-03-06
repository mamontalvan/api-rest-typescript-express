import { DataTypes } from 'sequelize';
import db from '../db/connection';
import { Sequelize } from 'sequelize-cockroachdb';
import Tribu from './tribu';


const Repositorio = db.define('repositorios', {

    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'E'
    },
    createTime: {
        allowNull: false,
        type: DataTypes.DATE,
        field:'create_time',
        defaultValue: Sequelize.fn('NOW')
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'A'
    },
    codigoVerificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 605
    },    
    tribusId: {
        type: DataTypes.INTEGER,
        references: {
            model: Tribu,
            key: 'id'
        }
    },    

}, 
{
    freezeTableName: true,
});

Tribu.hasMany(Repositorio);
Repositorio.belongsTo(Tribu, { as: 'Tribu', foreignKey:'tribusId' });



export default Repositorio;