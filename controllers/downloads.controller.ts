import { Request, Response } from 'express';
import Tribu from '../models/tribu';
import { Parser } from 'json2csv';
import { obtenerReposPorTribu } from '../helpers/db-validators';



export const getDownloadRepo = async (req: Request, res: Response) => {

    const esUnValorNumerico = parseInt( req.params.idTribu );

    const { idTribu } = req.params;

    if ( !(isNaN(esUnValorNumerico)) ) {

        const existeTribu = await Tribu.findByPk( idTribu );

        if (!existeTribu) {
            
            res.header('Content-Type', 'text/html');

            return res.send(`La Tribu  ${idTribu} no se encuentra registrada`)

        }

        const repositorios = await obtenerReposPorTribu(idTribu);


        const fields = ['id', 
                        'name', 
                        'state', 
                        'codigoVerificacion', 
                        'metrica.coverage', 
                        'metrica.bugs',
                        'metrica.vulnerabilities',
                        'metrica.hotspot',
                        'metrica.codeSmeell',
                        'Tribu.tribu',
                        'Tribu.Organizacion.id',
                        'Tribu.Organizacion.Organizacion'];
        const fileName = `repositorios.csv`;
        const json2csv = new Parser({ fields });
        const csv = json2csv.parse( repositorios );

        res.header('Content-Type', 'text/csv');

        res.attachment(fileName);

        return res.send(csv);

    }else{ 

        return res.send(`La Tribu  ${ req.params.idTribu } debe ser un valor numérico`)

    }
    
}