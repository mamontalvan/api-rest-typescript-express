"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const organizaciones_controller_1 = require("../controllers/organizaciones.controller");
const db_validators_1 = require("../helpers/db-validators");
const validaCampos_1 = require("../middlewares/validaCampos");
const router = (0, express_1.Router)();
//Presenta todas las organizaciones
router.get('/', organizaciones_controller_1.getOrganizaciones);
//Obtiene una categoría por ID
router.get('/:id', organizaciones_controller_1.getOrganizacionPorId);
//Crea una Organización
router.post('/', [(0, express_validator_1.body)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.body)('name').custom((name) => (0, db_validators_1.validaNombreOrganizacion)(name)),
    (0, express_validator_1.body)('status').custom((status) => (0, db_validators_1.validaEstadosPermitidos)(status)),
    validaCampos_1.validarCampos
], organizaciones_controller_1.postOrganizacion);
//Acutaliza una Organización, se envía el ID de la Organización a actualizar
router.put('/:id', [(0, express_validator_1.body)('name').custom((name) => (0, db_validators_1.validaNombreOrganizacion)(name)),
    (0, express_validator_1.body)('status').custom((status) => (0, db_validators_1.validaEstadosPermitidos)(status)),
    validaCampos_1.validarCampos
], organizaciones_controller_1.putOrganizacion);
//Elimina una Organización, se envía el ID de la Organización a eliminar
router.delete('/:id', organizaciones_controller_1.deleteOrganizacion);
exports.default = router;
//# sourceMappingURL=organizaciones.routes.js.map