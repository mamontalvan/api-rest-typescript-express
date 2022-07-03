import { Router } from 'express';
import { body, check } from 'express-validator';
import { getTribus, getTribuPorId, postTribu, putTribu, deleteTribu } from '../controllers/tribus.controller';
import { validaIdOrganizacion, validaNombreOrganizacion, validaNombreTribu } from '../helpers/db-validators';
import { validarCampos } from '../middlewares/validaCampos';



const router =  Router();

//Presenta todas las Tribus
router.get('/', getTribus );

//Obtiene una Tribu por ID
router.get('/:id', getTribuPorId );

//Crea una Tribu
router.post('/', 
        [   body('name', 'El nombre es obligatorio').not().isEmpty(),
            body('name').custom((name) => validaNombreTribu(name)),
            body('organizacionId', 'El identificador de la Organización es obligatorio').not().isEmpty(),            
            body('organizacionId').custom((organizacionId) => validaIdOrganizacion(organizacionId)),
            check('status', 'El status debe ser: 1 (Activo) ó 0 (Inactivo)').isIn([1, 0]),
            validarCampos
        ],
        postTribu );

//Acutaliza una Tribu, se envía el ID de la tribu a actualizar
router.put('/:id', 
        [
            body('name').custom((name) => validaNombreTribu(name)),
            check('status', 'El status debe ser: 1 (Activo) ó 0 (Inactivo)').isIn([1, 0]),
            body('organizacionId').custom((organizacionId) => validaIdOrganizacion(organizacionId)),
            validarCampos
        ],
        putTribu );

//Elimina una Tribu, se envía el ID de la Tribu a eliminar
router.delete('/:id', deleteTribu );




export default router;