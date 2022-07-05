import { Request, Response } from 'express';
import Metrica from '../models/metrica';
import Repositorio from '../models/repositorio';
import Tribu from '../models/tribu';
import { Op, Sequelize } from 'sequelize';
import { Parser } from 'json2csv';
import Organizacion from '../models/organizacion';
import { obtenerReposPorTribu } from '../helpers/db-validators';

export const obtenerRepositoriosPorTribu = async (req: Request, res: Response) => {

    const { idTribu } = req.params;
    

    const existeTribu = await Tribu.findByPk(idTribu);

    if (!existeTribu) {
        return res.status(400).json({
            msg: `La Tribu  ${idTribu} no se encuentra registrada`
        })
    }

    const repositorios = await obtenerReposPorTribu(idTribu);


    if (!(repositorios.length === 0)) {

        res.status(200).json({
            repositorios
        });
    } else {

        return res.status(404).json({
            msg: `La Tribu no tiene repositorios que cumplan con la cobertura necesaria`,
        });

    }


};


//Registrar métricas
export const postMetrica = async (req: Request, res: Response) => {

    const { repositorId } = req.body;

    try {
        const existeMetrica = await Metrica.findByPk(repositorId);

        if (existeMetrica) {
            return res.status(400).json({
                msg: `Ya existen registros de métricas para el repositorio  ${repositorId}`
            })
        }

        const metrica = await Metrica.create(req.body);
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


//Actualizar datos de la métrica
export const putMetrica = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const metrica = await Metrica.findByPk(id);
        if (!metrica) {
            return res.status(404).json({
                msg: `No existe la registro con el ID: ${id}`,
            });
        }

        await metrica.update(req.body);

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


