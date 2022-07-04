import { Router } from 'express';
import { body, check } from 'express-validator';
import { getOrganizaciones, 
        getOrganizacionPorId, 
        postOrganizacion, 
        putOrganizacion, 
        deleteOrganizacion }  from '../controllers/organizaciones.controller';
import { validaNombreOrganizacion, validaEstadosPermitidos } from '../helpers/db-validators';
import { validarCampos } from '../middlewares/validaCampos';


const router =  Router();


//Presenta todas las organizaciones
router.get('/', getOrganizaciones );

//Obtiene una categoría por ID
router.get('/:id', getOrganizacionPorId );

//Crea una Organización
router.post('/', 
        [   body('name', 'El nombre es obligatorio').not().isEmpty(), 
            body('name').custom((name) => validaNombreOrganizacion(name)),
            body('status').custom((status) => validaEstadosPermitidos(status)),
            validarCampos 
        ],
        postOrganizacion 
);

//Acutaliza una Organización, se envía el ID de la Organización a actualizar
router.put('/:id', 
        [     body('name').custom((name) => validaNombreOrganizacion(name)),
              body('status').custom((status) => validaEstadosPermitidos(status)),
              validarCampos 
        ],
        putOrganizacion );

//Elimina una Organización, se envía el ID de la Organización a eliminar
router.delete('/:id', deleteOrganizacion );


export default router;