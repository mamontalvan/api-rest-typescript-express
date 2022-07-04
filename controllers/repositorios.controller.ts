import { Request, Response } from 'express';
import Repositorio from '../models/repositorio';

export const getRepositorios = async ( req:Request, res:Response ) => {

    const status:string = 'A';
    // const organizaciones = await Organizacion.findAll();
    const repositorios = await Repositorio.findAll({
        attributes: ['id', 'codigoVerificacion'],
        where:{
            status
        }
    });

    console.log(repositorios);
    
    res.status(200).json({
        msg: 'Lista de Repositorios',
        repositorios
    });

};


export const getRepositorioPorId = async( req:Request, res:Response ) => {

    const { id } = req.params;
    const repositorio = await Repositorio.findByPk(id);

    if( !repositorio ){
        return res.status(404).json({
            msg: `No existe un Repositorio con ID: ${ id }`,
        });
    }

    res.status(200).json({
        msg: 'Respositorio Encontrado',
        repositorio
    });

};


export const postRepositorio = async( req:Request, res:Response ) => {

    const name:string = req.body.name.toUpperCase();
    const state:number = req.body.state;
    const tribuId:number = req.body.tribuId;

    
    try {      

        const repositorio = await Repositorio.create( { name, state, tribuId } ); 
        await repositorio.save();

        res.status(200).json({
            msg: 'Repositorio Creado',
            repositorio
    
        });
    
    } catch (error) {
        console.log(error);//Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',            
        });
    
    }

};



export const putRepositorio = async( req:Request, res:Response ) => {

    const { id } = req.params;
    const name:string = req.body.name.toUpperCase();
    const status:number = req.body.status;
    const organizacionId:number = req.body.organizacionId;

    try {

        const repositorio = await Repositorio.findByPk( id );
        if( !repositorio ){
            return res.status(404).json({
                msg: `No existe una Repositorio con ID: ${ id }`,
            });
        }

        await repositorio.update( { name, status, organizacionId } );

        res.status(200).json({
            msg: 'Repositorio Atualizada',
            repositorio
    
        });

    } catch (error) {
        console.log(error);//Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',            
        });
    
    }

};


export const deleteRepositorio = async( req:Request, res:Response ) => {

    const { id } = req.params;

    const repositorio = await Repositorio.findByPk( id );
    if( !repositorio ){
        return res.status(404).json({
            msg: `No existe una Repositorio con ID: ${ id }`,
        });
    }

    await repositorio.update({ status: 'I' });
    //Para la eliminación física descomentar la siguiente línea
    // await organizacion.destroy();

    res.json({
        msg: 'Repositorio Eliminado',
        repositorio
    });

};