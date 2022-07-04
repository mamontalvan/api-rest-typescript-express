import { Request, Response } from 'express';
import Organizacion from '../models/organizacion';
import { Op, Sequelize } from 'sequelize';

export const getOrganizaciones = async ( req:Request, res:Response ) => {

    const organizaciones:object = await Organizacion.findAll({
        raw: true,
        attributes: ['id','name',
        [Sequelize.literal("CASE WHEN \"status\" = '1' THEN 'Enable' ELSE 'Disable' END "), 'status'],
        ],
        where:{
            status:1
        }
    });

    res.status(200).json({
        organizaciones
    });

};


export const getOrganizacionPorId = async( req:Request, res:Response ) => {

    const { id } = req.params;
    // const status = true;
    const organizacion = await Organizacion.findByPk(id);
    // const organizacion = await Organizacion.findOne({
    //     where:{
    //         id,
    //         status
    //     }
    // });

    if( !organizacion ){
        return res.status(404).json({
            msg: `No existe una organizacion con ID: ${ id }`,
        });
    }

    res.status(200).json({
        msg: 'Organización Encontrada',
        organizacion
    });

};


export const postOrganizacion = async ( req:Request, res:Response ) => {
    
    const name:string = req.body.name.toUpperCase();
    const status:number = req.body.status;
    
    try {
        
        const organizacion = await Organizacion.create( { name, status } ); 
        await organizacion.save();

        res.status(200).json({
            msg: 'Organizacion Creada',
            organizacion
    
        });
    
    } catch (error) {
        console.log(error);//Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',            
        });
    
    }


};



export const putOrganizacion = async( req:Request, res:Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {
        
        const organizacion = await Organizacion.findByPk( id );
        if( !organizacion ){
            return res.status(404).json({
                msg: `No existe una organizacion con ID: ${ id }`,
            });
        }

        await organizacion.update( body );

        res.status(200).json({
            msg: 'Organizacion Atualizada',
            organizacion
    
        });

    } catch (error) {
        console.log(error);//Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',            
        });
    
    }

};


export const deleteOrganizacion = async ( req:Request, res:Response ) => {

    const { id } = req.params;

    const organizacion = await Organizacion.findByPk( id );
    if( !organizacion ){
        return res.status(404).json({
            msg: `No existe una organizacion con ID: ${ id }`,
        });
    }

    await organizacion.update({ status: 0 });
    //Para la eliminación física descomentar la siguiente línea
    // await organizacion.destroy();

    res.json({
        msg: 'Organizacion Eliminada',
        organizacion
    });

};