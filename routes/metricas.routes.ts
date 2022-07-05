import { Router } from 'express';
import { body, check } from 'express-validator';
import { validarCampos } from '../middlewares/validaCampos';
import { postMetrica, putMetrica, obtenerRepositoriosPorTribu } from '../controllers/metricas.controller';
import { validaIdRepositorio, validaIdTribu } from '../helpers/db-validators';


const router =  Router();


router.get('/:idTribu', 
        [
            check('tribuId').custom((tribuId) => validaIdTribu(tribuId)),
            body('repositorioId').custom((repositorioId) => validaIdRepositorio(repositorioId)),
            validarCampos
        ],
        obtenerRepositoriosPorTribu );


//Registrar las métricas de un repositorio
router.post('/', 
        [
            body('repositorioId').custom((repositorioId) => validaIdRepositorio(repositorioId)),
            validarCampos
        ],
        postMetrica );

//Actualizar datos deuna métrica
router.put('/:id', 
        [
            body('repositorioId').custom((repositorioId) => validaIdRepositorio(repositorioId)),
            validarCampos
        ],
        putMetrica );


export default router;