import { Request, Response } from 'express';
import Metrica from '../models/metrica';
import Repositorio from '../models/repositorio';
import Tribu from '../models/tribu';
import { Op, Sequelize } from 'sequelize';


export const obtenerRepositoriosPorTribu = async ( req:Request, res:Response ) => {

    const { idTribu } = req.params;

    const existeTribu = await Tribu.findByPk( idTribu );

    if (!existeTribu) {
        return res.status(400).json({
            msg: `La Tribu  ${ idTribu } no se encuentra registrada`
        })
    }
    
    const datosRespositorio = await Repositorio.findAll({
        attributes: ['id', 
                    'name', 
                    'createTime',                    
                    [ Sequelize.literal("CASE WHEN \"state\" = 'E' THEN 'Enable' WHEN \"state\" = 'D' THEN 'Disable' ELSE 'Archived' END"), 'state'],
                    'codigoVerificacion',
                    [ Sequelize.literal("CASE WHEN  \"codigoVerificacion\" = 604 THEN 'Verificado' WHEN  \"codigoVerificacion\" = 605 THEN 'En Espera' ELSE 'Aprobado' END"), 'codigoVerificacion'],
                ],
        where: {
            tribuId: idTribu,
            state: 'E',
            create_time: {
                [Op.gte]: '2022/01/01',
              }
        },
        include: [
            {
                model: Metrica,
                attributes: ['coverage', 'bugs', 'vulnerabilities', 'hotspot', 'codeSmeell'],
                where: { 
                    coverage: {
                        [Op.gte]: 75,
                    },
                }
            },            
        ], 
      });

    if( !( datosRespositorio.length === 0 ) ){
        console.log('dentro');
        res.status(200).json({
            msg: 'Respositorios',
            datosRespositorio
        });
    }else{

        return res.status(404).json({
            msg: `La Tribu no tiene repositorios que cumplan con la cobertura necesaria`,
        });

    }


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


