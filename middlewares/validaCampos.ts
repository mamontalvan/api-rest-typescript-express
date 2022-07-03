import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validarCampos = (req:Request, res:Response, next:NextFunction ) => {

    const errores = validationResult(req);

    //Si hay errores
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores })
    }

    next();
}
