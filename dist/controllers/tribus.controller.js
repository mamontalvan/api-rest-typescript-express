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
exports.deleteTribu = exports.putTribu = exports.postTribu = exports.getTribuPorId = exports.getTribus = void 0;
const tribu_1 = __importDefault(require("../models/tribu"));
const getTribus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = 1;
    // const organizaciones = await Organizacion.findAll();
    const tribus = yield tribu_1.default.findAll({
        where: {
            status
        }
    });
    res.status(200).json({
        msg: 'Lista de Tribus',
        tribus
    });
});
exports.getTribus = getTribus;
const getTribuPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const status = true;
    const tribu = yield tribu_1.default.findByPk(id);
    if (!tribu) {
        return res.status(404).json({
            msg: `No existe una Tribu con ID: ${id}`,
        });
    }
    res.status(200).json({
        msg: 'Tribu Encontrada',
        tribu
    });
});
exports.getTribuPorId = getTribuPorId;
const postTribu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name.toUpperCase();
    const status = req.body.status;
    const organizacionId = req.body.organizacionId;
    try {
        const tribu = yield tribu_1.default.create({ name, status, organizacionId });
        yield tribu.save();
        res.status(200).json({
            msg: 'Tribu Creada',
            tribu
        });
    }
    catch (error) {
        console.log(error); //Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
});
exports.postTribu = postTribu;
const putTribu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    const status = req.body.status;
    const organizacionId = req.body.organizacionId;
    try {
        const tribu = yield tribu_1.default.findByPk(id);
        if (!tribu) {
            return res.status(404).json({
                msg: `No existe una Tribu con ID: ${id}`,
            });
        }
        yield tribu.update({ name, status, organizacionId });
        res.status(200).json({
            msg: 'Tribu Atualizada',
            tribu
        });
    }
    catch (error) {
        console.log(error); //Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
});
exports.putTribu = putTribu;
const deleteTribu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tribu = yield tribu_1.default.findByPk(id);
    if (!tribu) {
        return res.status(404).json({
            msg: `No existe una Tribu con ID: ${id}`,
        });
    }
    yield tribu.update({ status: 0 });
    //Para la eliminación física descomentar la siguiente línea
    // await organizacion.destroy();
    res.json({
        msg: 'Tribu Eliminada',
        tribu
    });
});
exports.deleteTribu = deleteTribu;
//# sourceMappingURL=tribus.controller.js.map