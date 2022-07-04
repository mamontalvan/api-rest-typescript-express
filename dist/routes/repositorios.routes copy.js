"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const repositorios_controller_1 = require("../controllers/repositorios.controller");
const db_validators_1 = require("../helpers/db-validators");
const validaCampos_1 = require("../middlewares/validaCampos");
const router = (0, express_1.Router)();
//Presenta todas los Repositorios
router.get('/', repositorios_controller_1.getRepositorios);
//Obtiene un Repositorio por ID
router.get('/:id', repositorios_controller_1.getRepositorioPorId);
//Crea un Repositorio
router.post('/', [
    (0, express_validator_1.body)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.body)('name').custom((name) => (0, db_validators_1.validaNombreRepositorio)(name)),
    (0, express_validator_1.check)('state', 'Sólo se permite registrar los estados: E, D, A ').isIn(['E', 'D', 'A']),
    (0, express_validator_1.body)('tribuId').custom((tribuId) => (0, db_validators_1.validaIdTribu)(tribuId)),
    validaCampos_1.validarCampos
], repositorios_controller_1.postRepositorio);
//Acutaliza un Repositorio, se envía el ID del repositorio a actualizar
router.put('/:id', [
    (0, express_validator_1.body)('name').custom((name) => (0, db_validators_1.validaNombreRepositorio)(name)),
    (0, express_validator_1.check)('state', 'Sólo se permite registrar los estados: E, D, A ').isIn(['E', 'D', 'A']),
    (0, express_validator_1.body)('tribuId').custom((tribuId) => (0, db_validators_1.validaIdTribu)(tribuId)),
    validaCampos_1.validarCampos
], repositorios_controller_1.putRepositorio);
//Elimina un Repositorio, se envía el ID de la repositorio a eliminar
router.delete('/:id', repositorios_controller_1.deleteRepositorio);
exports.default = router;
//# sourceMappingURL=repositorios.routes%20copy.js.map