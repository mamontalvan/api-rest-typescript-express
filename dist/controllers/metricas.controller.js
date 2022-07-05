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
exports.putMetrica = exports.postMetrica = exports.obtenerRepositoriosPorTribu = void 0;
const metrica_1 = __importDefault(require("../models/metrica"));
const tribu_1 = __importDefault(require("../models/tribu"));
const db_validators_1 = require("../helpers/db-validators");
const obtenerRepositoriosPorTribu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTribu } = req.params;
    const existeTribu = yield tribu_1.default.findByPk(idTribu);
    if (!existeTribu) {
        return res.status(400).json({
            msg: `La Tribu  ${idTribu} no se encuentra registrada`
        });
    }
    const repositorios = yield (0, db_validators_1.obtenerReposPorTribu)(idTribu);
    if (!(repositorios.length === 0)) {
        res.status(200).json({
            repositorios
        });
    }
    else {
        return res.status(404).json({
            msg: `La Tribu no tiene repositorios que cumplan con la cobertura necesaria`,
        });
    }
});
exports.obtenerRepositoriosPorTribu = obtenerRepositoriosPorTribu;
//Registrar métricas
const postMetrica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { repositorId } = req.body;
    try {
        const existeMetrica = yield metrica_1.default.findByPk(repositorId);
        if (existeMetrica) {
            return res.status(400).json({
                msg: `Ya existen registros de métricas para el repositorio  ${repositorId}`
            });
        }
        const metrica = yield metrica_1.default.create(req.body);
        yield metrica.save();
        res.status(200).json({
            msg: 'Métrica Registrada',
            metrica
        });
    }
    catch (error) {
        console.log(error); //Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
});
exports.postMetrica = postMetrica;
//Actualizar datos de la métrica
const putMetrica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const metrica = yield metrica_1.default.findByPk(id);
        if (!metrica) {
            return res.status(404).json({
                msg: `No existe la registro con el ID: ${id}`,
            });
        }
        yield metrica.update(req.body);
        res.status(200).json({
            msg: 'Métrica Atualizada',
            metrica
        });
    }
    catch (error) {
        console.log(error); //Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
});
exports.putMetrica = putMetrica;
//# sourceMappingURL=metricas.controller.js.map