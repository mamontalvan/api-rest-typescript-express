import { Router } from 'express';
import { body, check } from 'express-validator';
import { validarCampos } from '../middlewares/validaCampos';
import { postMetrica, putMetrica, obtenerRepositoriosPorTribu } from '../controllers/metricas.controller';
import { validaIdRepositorio, validaIdTribu } from '../helpers/db-validators';


const router =  Router();


router.get('/:idTribu', 
        [
            check('tribuId').custom((tribuId) => validaIdTribu(tribuId)),
            body('repositorId').custom((repositorId) => validaIdRepositorio(repositorId)),
            validarCampos
        ],
        obtenerRepositoriosPorTribu );


//Registrar las métricas de un repositorio
router.post('/', 
        [
            body('repositorId').custom((repositorId) => validaIdRepositorio(repositorId)),
            validarCampos
        ],
        postMetrica );

//Actualizar datos deuna métrica
router.put('/:id', 
        [
            body('repositorId').custom((repositorId) => validaIdRepositorio(repositorId)),
            validarCampos
        ],
        putMetrica );



export default router;