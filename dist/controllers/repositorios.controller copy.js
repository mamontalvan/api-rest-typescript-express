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
exports.deleteRepositorio = exports.putRepositorio = exports.postRepositorio = exports.getRepositorioPorId = exports.getRepositorios = void 0;
const repositorio_1 = __importDefault(require("../models/repositorio"));
const getRepositorios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = 'A';
    // const organizaciones = await Organizacion.findAll();
    const repositorios = yield repositorio_1.default.findAll({
        where: {
            status
        }
    });
    res.status(200).json({
        msg: 'Lista de Repositorios',
        repositorios
    });
});
exports.getRepositorios = getRepositorios;
const getRepositorioPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const repositorio = yield repositorio_1.default.findByPk(id);
    if (!repositorio) {
        return res.status(404).json({
            msg: `No existe un Repositorio con ID: ${id}`,
        });
    }
    res.status(200).json({
        msg: 'Respositorio Encontrado',
        repositorio
    });
});
exports.getRepositorioPorId = getRepositorioPorId;
const postRepositorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name.toUpperCase();
    const state = req.body.state;
    const tribuId = req.body.tribuId;
    try {
        const repositorio = yield repositorio_1.default.create({ name, state, tribuId });
        yield repositorio.save();
        res.status(200).json({
            msg: 'Repositorio Creado',
            repositorio
        });
    }
    catch (error) {
        console.log(error); //Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
});
exports.postRepositorio = postRepositorio;
const putRepositorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    const status = req.body.status;
    const organizacionId = req.body.organizacionId;
    try {
        const repositorio = yield repositorio_1.default.findByPk(id);
        if (!repositorio) {
            return res.status(404).json({
                msg: `No existe una Repositorio con ID: ${id}`,
            });
        }
        yield repositorio.update({ name, status, organizacionId });
        res.status(200).json({
            msg: 'Repositorio Atualizada',
            repositorio
        });
    }
    catch (error) {
        console.log(error); //Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
});
exports.putRepositorio = putRepositorio;
const deleteRepositorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const repositorio = yield repositorio_1.default.findByPk(id);
    if (!repositorio) {
        return res.status(404).json({
            msg: `No existe una Repositorio con ID: ${id}`,
        });
    }
    yield repositorio.update({ status: 'I' });
    //Para la eliminación física descomentar la siguiente línea
    // await organizacion.destroy();
    res.json({
        msg: 'Repositorio Eliminado',
        repositorio
    });
});
exports.deleteRepositorio = deleteRepositorio;
//# sourceMappingURL=repositorios.controller%20copy.js.map