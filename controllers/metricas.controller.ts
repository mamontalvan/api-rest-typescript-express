import { Request, Response } from 'express';
import Metrica from '../models/metrica';
import Repositorio from '../models/repositorio';

export const obtenerRepositoriosPorTribu = async ( req:Request, res:Response ) => {

    const { idTribu } = req.params;
    console.log( 'ID_TRIBU', { idTribu } );
    const datosRespositorio = await Repositorio.findAll({
        where: {
            tribuId: idTribu
        },
        include: Metrica
      });

      console.log({datosRespositorio});
      
    res.status(200).json({
        msg: 'Métricas',
        datosRespositorio
    });

};



export const postMetrica = async( req:Request, res:Response ) => {

    const { repositorId } = req.body;
    
    try {      
        const existeMetrica = await Metrica.findByPk( repositorId );

        if (existeMetrica) {
            return res.status(400).json({
                msg: `Ya existen registros de métricas para el repositorio  ${ repositorId }`
            })
        }

        const metrica = await Metrica.create( req.body ); 
        await metrica.save();

        res.status(200).json({
            msg: 'Métrica Registrada',
            metrica
    
        });
    
    } catch (error) {
        console.log(error);//Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',            
        });
    
    }

};



export const putMetrica = async( req:Request, res:Response ) => {

    const { id } = req.params;

    try {

        const metrica = await Metrica.findByPk( id );
        if( !metrica ){
            return res.status(404).json({
                msg: `No existe la registro con el ID: ${ id }`,
            });
        }

        await metrica.update( req.body );

        res.status(200).json({
            msg: 'Métrica Atualizada',
            metrica
    
        });

    } catch (error) {
        console.log(error);//Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',            
        });
    
    }

};


