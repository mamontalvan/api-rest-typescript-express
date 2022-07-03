import { Router } from 'express';
import { body, check } from 'express-validator';
import { getRepositorios, getRepositorioPorId, postRepositorio, putRepositorio, deleteRepositorio } from '../controllers/repositorios.controller';
import { validaIdTribu, validaNombreRepositorio } from '../helpers/db-validators';
import { validarCampos } from '../middlewares/validaCampos';


const router =  Router();

//Presenta todas los Repositorios
router.get('/', getRepositorios );

//Obtiene un Repositorio por ID
router.get('/:id', getRepositorioPorId );

//Crea un Repositorio
router.post('/', 
        [
            body('name', 'El nombre es obligatorio').not().isEmpty(),
            body('name').custom((name) => validaNombreRepositorio(name)),
            check('state', 'Sólo se permite registrar los estados: E, D, A ').isIn(['E', 'D', 'A']),
            body('tribuId').custom((tribuId) => validaIdTribu(tribuId)),
            validarCampos
        ],
        postRepositorio );

//Acutaliza un Repositorio, se envía el ID del repositorio a actualizar
router.put('/:id', 
        [
            body('name').custom((name) => validaNombreRepositorio(name)),
            check('state', 'Sólo se permite registrar los estados: E, D, A ').isIn(['E', 'D', 'A']),
            body('tribuId').custom((tribuId) => validaIdTribu(tribuId)),
            validarCampos
        ],
        putRepositorio );

//Elimina un Repositorio, se envía el ID de la repositorio a eliminar
router.delete('/:id', deleteRepositorio );




export default router;