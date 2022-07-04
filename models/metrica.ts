import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Repositorio from './repositorio';



const Metrica = db.define('metricas', {

    repositorioId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: Repositorio,
            key: 'id'
        }
    }, 
    coverage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    bugs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    vulnerabilities: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    hotspot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    codeSmeell: {
        type: DataTypes.INTEGER,
        field:'code_smells',
        allowNull: false,        
        defaultValue:0,
    }    

}, 
{
    freezeTableName: true,
});

Repositorio.hasOne(Metrica );
Metrica.belongsTo(Repositorio, { as: 'Repositorio', foreignKey:'repositorioId' });


export default Metrica;