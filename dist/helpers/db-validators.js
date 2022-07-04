"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaCodigosVerificacion = exports.validaEstadosPermitidos = exports.validaIdRepositorio = exports.validaNombreRepositorio = exports.validaNombreTribu = exports.validaIdTribu = exports.validaNombreOrganizacion = exports.validaIdOrganizacion = void 0;
const organizacion_1 = __importDefault(require("../models/organizacion"));
const repositorio_1 = __importDefault(require("../models/repositorio"));
const tribu_1 = __importDefault(require("../models/tribu"));
const validaIdOrganizacion = (idOrganizacion) => __awaiter(void 0, void 0, void 0, function* () {
    if (!!idOrganizacion) {
        if (!isNaN(idOrganizacion)) {
            const organizacion = yield organizacion_1.default.findByPk(idOrganizacion);
            if (!organizacion) {
                throw new Error(`El ID de la Organización: ${idOrganizacion} no es válido.`);
            }
            return true;
        }
        else {
            throw new Error(`El ID de la Organización: ${idOrganizacion} debe ser un valor numérico`);
        }
    }
});
exports.validaIdOrganizacion = validaIdOrganizacion;
const validaNombreOrganizacion = (nameOrganizacion) => __awaiter(void 0, void 0, void 0, function* () {
    if (!!nameOrganizacion) {
        const existeNombre = yield organizacion_1.default.findOne({
            where: {
                name: nameOrganizacion.toUpperCase()
            }
        });
        if (existeNombre) {
            throw new Error(`La Organización con nombre: ${nameOrganizacion} ya se encuentra registrada!`);
        }
        return true;
    }
});
exports.validaNombreOrganizacion = validaNombreOrganizacion;
const validaIdTribu = (idTribu) => __awaiter(void 0, void 0, void 0, function* () {
    if (!!idTribu) {
        if (!isNaN(idTribu)) {
            const organizacion = yield tribu_1.default.findByPk(idTribu);
            if (!organizacion) {
                throw new Error(`El ID de la Tribu: ${idTribu} no es válido.`);
            }
            return true;
        }
        else {
            throw new Error(`El ID de la Organización: ${idTribu} debe ser un valor numérico`);
        }
    }
});
exports.validaIdTribu = validaIdTribu;
const validaNombreTribu = (nameTribu) => __awaiter(void 0, void 0, void 0, function* () {
    if (!!nameTribu) {
        const existeNombre = yield tribu_1.default.findOne({
            where: {
                name: nameTribu.toUpperCase()
            }
        });
        if (existeNombre) {
            throw new Error(`La Tribu con nombre: ${nameTribu} ya se encuentra registrada!`);
        }
        return true;
    }
});
exports.validaNombreTribu = validaNombreTribu;
const validaNombreRepositorio = (nameRepositorio) => __awaiter(void 0, void 0, void 0, function* () {
    if (!!nameRepositorio) {
        const existeNombre = yield repositorio_1.default.findOne({
            where: {
                name: nameRepositorio.toUpperCase()
            }
        });
        if (existeNombre) {
            throw new Error(`El Repositorio con nombre: ${nameRepositorio} ya se encuentra registrado!`);
        }
        return true;
    }
});
exports.validaNombreRepositorio = validaNombreRepositorio;
const validaIdRepositorio = (idRepositorio) => __awaiter(void 0, void 0, void 0, function* () {
    if (!!idRepositorio) {
        if (!isNaN(idRepositorio)) {
            const repositorio = yield repositorio_1.default.findByPk(idRepositorio);
            if (!repositorio) {
                throw new Error(`El ID del Repositorio: ${idRepositorio} no es válido.`);
            }
            return true;
        }
        else {
            throw new Error(`El ID del Repositorio: ${idRepositorio} debe ser un valor numérico`);
        }
    }
});
exports.validaIdRepositorio = validaIdRepositorio;
const validaEstadosPermitidos = (estado) => __awaiter(void 0, void 0, void 0, function* () {
    if (!!estado) {
        if (!isNaN(estado)) {
            const estadosPermitidos = [1, 2];
            const esPermitido = estadosPermitidos.includes(estado);
            if (!esPermitido) {
                throw new Error(`Sólo se permite registrar dos estados: 1(activo) ó 0(inactivo)`);
            }
            return true;
        }
        else {
            throw new Error(`El status: ${estado} debe ser un valor numérico`);
        }
    }
});
exports.validaEstadosPermitidos = validaEstadosPermitidos;
const validaCodigosVerificacion = (estadoVerificacion) => __awaiter(void 0, void 0, void 0, function* () {
    if (!!estadoVerificacion) {
        if (!isNaN(estadoVerificacion)) {
            const estadosPermitidos = [604, 605, 606];
            const esPermitido = estadosPermitidos.includes(estadoVerificacion);
            if (!esPermitido) {
                throw new Error(`Sólo se permite registrar dos estados: : E, D, A`);
            }
            return true;
        }
        else {
            throw new Error(`El estado de verificación: ${estadoVerificacion} debe ser un valor numérico`);
        }
    }
});
exports.validaCodigosVerificacion = validaCodigosVerificacion;
//# sourceMappingURL=db-validators.js.map