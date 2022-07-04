"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const tribus_controller_1 = require("../controllers/tribus.controller");
const db_validators_1 = require("../helpers/db-validators");
const validaCampos_1 = require("../middlewares/validaCampos");
const router = (0, express_1.Router)();
//Presenta todas las Tribus
router.get('/', tribus_controller_1.getTribus);
//Obtiene una Tribu por ID
router.get('/:id', tribus_controller_1.getTribuPorId);
//Crea una Tribu
router.post('/', [(0, express_validator_1.body)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.body)('name').custom((name) => (0, db_validators_1.validaNombreTribu)(name)),
    (0, express_validator_1.body)('organizacionId', 'El identificador de la Organización es obligatorio').not().isEmpty(),
    (0, express_validator_1.body)('organizacionId').custom((organizacionId) => (0, db_validators_1.validaIdOrganizacion)(organizacionId)),
    (0, express_validator_1.check)('status', 'El status debe ser: 1 (Activo) ó 0 (Inactivo)').isIn([1, 0]),
    validaCampos_1.validarCampos
], tribus_controller_1.postTribu);
//Acutaliza una Tribu, se envía el ID de la tribu a actualizar
router.put('/:id', [
    (0, express_validator_1.body)('name').custom((name) => (0, db_validators_1.validaNombreTribu)(name)),
    (0, express_validator_1.check)('status', 'El status debe ser: 1 (Activo) ó 0 (Inactivo)').isIn([1, 0]),
    (0, express_validator_1.body)('organizacionId').custom((organizacionId) => (0, db_validators_1.validaIdOrganizacion)(organizacionId)),
    validaCampos_1.validarCampos
], tribus_controller_1.putTribu);
//Elimina una Tribu, se envía el ID de la Tribu a eliminar
router.delete('/:id', tribus_controller_1.deleteTribu);
exports.default = router;
//# sourceMappingURL=tribus.routes.js.map