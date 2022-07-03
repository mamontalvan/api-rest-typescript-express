import { Router } from 'express';
import { body, check } from 'express-validator';
import { validarCampos } from '../middlewares/validaCampos';
import { getMetricas, postMetrica, putMetrica } from '../controllers/metricas.controller';
import { validaIdRepositorio } from '../helpers/db-validators';


const router =  Router();



//Registro de un Métrica
router.post('/', 
        [
            body('repositorId').custom((repositorId) => validaIdRepositorio(repositorId)),
            validarCampos
        ],
        postMetrica );

//Actualizar datos de la métrica de un determinado repositorio
router.put('/:id', 
        [
            body('repositorId').custom((repositorId) => validaIdRepositorio(repositorId)),
            validarCampos
        ],
        putMetrica );



export default router;