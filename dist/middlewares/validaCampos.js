"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req);
    //Si hay errores
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores });
    }
    next();
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validaCampos.js.map