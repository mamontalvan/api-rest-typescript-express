import { Router } from 'express';
import { body, check } from 'express-validator';
import { getRepositorios, getRepositorioPorId, postRepositorio, putRepositorio, deleteRepositorio } from '../controllers/repositorios.controller';
import { validaIdTribu, validaNombreRepositorio, validaCodigosVerificacion } from '../helpers/db-validators';
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
            body('state', 'El estado es obligatorio').not().isEmpty(),
            check('state', 'Sólo se permite registrar los estados: E, D, A ').isIn(['E', 'D', 'A']),
            body('tribuId', 'El identificador de la tribu es obligatorio').not().isEmpty(),
            body('tribuId').custom((tribuId) => validaIdTribu(tribuId)),
            body('codigoVerificacion', 'El código de verificación es obligatorio').not().isEmpty(),
            check('codigoVerificacion', 'Códigos de verificación permitidos: 604, 605, 606 ').isIn([604, 605, 606]),
            validarCampos
        ],
        postRepositorio );

//Acutaliza un Repositorio, se envía el ID del repositorio a actualizar
router.put('/:id', 
        [
            body('name').custom((name) => validaNombreRepositorio(name)),
            check('state', 'Sólo se permite registrar los estados: E, D, A ').isIn(['E', 'D', 'A']),
            body('codigoVerificacion').custom((codigoVerificacion) => validaCodigosVerificacion(codigoVerificacion)),
            body('tribuId').custom((tribuId) => validaIdTribu(tribuId)),
            validarCampos
        ],
        putRepositorio );

//Elimina un Repositorio, se envía el ID de la repositorio a eliminar
router.delete('/:id', deleteRepositorio );




export default router;