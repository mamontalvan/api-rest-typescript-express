"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validaCampos_1 = require("../middlewares/validaCampos");
const metricas_controller_1 = require("../controllers/metricas.controller");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/:idTribu', [
    (0, express_validator_1.check)('tribuId').custom((tribuId) => (0, db_validators_1.validaIdTribu)(tribuId)),
    (0, express_validator_1.body)('repositorioId').custom((repositorioId) => (0, db_validators_1.validaIdRepositorio)(repositorioId)),
    validaCampos_1.validarCampos
], metricas_controller_1.obtenerRepositoriosPorTribu);
//Registrar las métricas de un repositorio
router.post('/', [
    (0, express_validator_1.body)('repositorioId').custom((repositorioId) => (0, db_validators_1.validaIdRepositorio)(repositorioId)),
    validaCampos_1.validarCampos
], metricas_controller_1.postMetrica);
//Actualizar datos deuna métrica
router.put('/:id', [
    (0, express_validator_1.body)('repositorioId').custom((repositorioId) => (0, db_validators_1.validaIdRepositorio)(repositorioId)),
    validaCampos_1.validarCampos
], metricas_controller_1.putMetrica);
router.get('/', metricas_controller_1.getDownload);
exports.default = router;
//# sourceMappingURL=metricas.routes.js.map