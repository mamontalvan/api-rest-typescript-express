import { Request, Response } from 'express';
import Organizacion from '../models/organizacion';
import Tribu from '../models/tribu';
import { Op, Sequelize } from 'sequelize';

export const getTribus = async ( req:Request, res:Response ) => {

    const tribus = await Tribu.findAll({
        raw: true,
        attributes: ['id',
                    'name',
                    // [Sequelize.literal("CASE WHEN \"status\" = '1' THEN 'Enable' ELSE 'Disable' END "), 'status'],
                ],
        where:{
            status: 1
        },include: [{
            model: Organizacion, as: "Organizacion",
            attributes: ['id', 'name'],
        }]
    });
    res.status(200).json({
        tribus
    });

};


export const getTribuPorId = async( req:Request, res:Response ) => {

    const { id } = req.params;
    // const status = true;
    const tribu = await Tribu.findByPk(id);

    if( !tribu ){
        return res.status(404).json({
            msg: `No existe una Tribu con ID: ${ id }`,
        });
    }

    res.status(200).json({
        msg: 'Tribu Encontrada',
        tribu
    });

};


export const postTribu = async ( req:Request, res:Response ) => {

    const name:string = req.body.name.toUpperCase();
    const status:number = req.body.status;
    const organizacioneId:number = req.body.organizacionId;

    
    try {      

        const tribu = await Tribu.create( { name, status, organizacioneId } ); 
        await tribu.save();

        res.status(200).json({
            msg: 'Tribu Creada',
            tribu
    
        });
    
    } catch (error) {
        console.log(error);//Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',            
        });
    
    }

};



export const putTribu = async( req:Request, res:Response ) => {

    const { id } = req.params;
    const name:string = req.body.name.toUpperCase();
    const status:number = req.body.status;
    const organizacioneId:number = req.body.organizacionId;

    try {

        const tribu = await Tribu.findByPk( id );
        if( !tribu ){
            return res.status(404).json({
                msg: `No existe una Tribu con ID: ${ id }`,
            });
        }

        await tribu.update( { name, status, organizacioneId } );

        res.status(200).json({
            msg: 'Tribu Atualizada',
            tribu
    
        });

    } catch (error) {
        console.log(error);//Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',            
        });
    
    }

};


export const deleteTribu = async( req:Request, res:Response ) => {

    const { id } = req.params;

    const tribu = await Tribu.findByPk( id );
    if( !tribu ){
        return res.status(404).json({
            msg: `No existe una Tribu con ID: ${ id }`,
        });
    }

    await tribu.update({ status: 0 });
    //Para la eliminación física descomentar la siguiente línea
    // await organizacion.destroy();

    res.json({
        msg: 'Tribu Eliminada',
        tribu
    });

};