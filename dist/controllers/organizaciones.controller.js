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
exports.deleteOrganizacion = exports.putOrganizacion = exports.postOrganizacion = exports.getOrganizacionPorId = exports.getOrganizaciones = void 0;
const organizacion_1 = __importDefault(require("../models/organizacion"));
const sequelize_1 = require("sequelize");
const getOrganizaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const organizaciones = yield organizacion_1.default.findAll({
        raw: true,
        attributes: ['id', 'name',
            [sequelize_1.Sequelize.literal("CASE WHEN \"status\" = '1' THEN 'Enable' ELSE 'Disable' END "), 'status'],
        ],
        where: {
            status: 1
        }
    });
    res.status(200).json({
        organizaciones
    });
});
exports.getOrganizaciones = getOrganizaciones;
const getOrganizacionPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const status = true;
    const organizacion = yield organizacion_1.default.findByPk(id);
    // const organizacion = await Organizacion.findOne({
    //     where:{
    //         id,
    //         status
    //     }
    // });
    if (!organizacion) {
        return res.status(404).json({
            msg: `No existe una organizacion con ID: ${id}`,
        });
    }
    res.status(200).json({
        msg: 'Organización Encontrada',
        organizacion
    });
});
exports.getOrganizacionPorId = getOrganizacionPorId;
const postOrganizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name.toUpperCase();
    const status = req.body.status;
    try {
        const organizacion = yield organizacion_1.default.create({ name, status });
        yield organizacion.save();
        res.status(200).json({
            msg: 'Organizacion Creada',
            organizacion
        });
    }
    catch (error) {
        console.log(error); //Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
});
exports.postOrganizacion = postOrganizacion;
const putOrganizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const organizacion = yield organizacion_1.default.findByPk(id);
        if (!organizacion) {
            return res.status(404).json({
                msg: `No existe una organizacion con ID: ${id}`,
            });
        }
        yield organizacion.update(body);
        res.status(200).json({
            msg: 'Organizacion Atualizada',
            organizacion
        });
    }
    catch (error) {
        console.log(error); //Para ver los logs de errores a nivel  de consola
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
});
exports.putOrganizacion = putOrganizacion;
const deleteOrganizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const organizacion = yield organizacion_1.default.findByPk(id);
    if (!organizacion) {
        return res.status(404).json({
            msg: `No existe una organizacion con ID: ${id}`,
        });
    }
    yield organizacion.update({ status: 0 });
    //Para la eliminación física descomentar la siguiente línea
    // await organizacion.destroy();
    res.json({
        msg: 'Organizacion Eliminada',
        organizacion
    });
});
exports.deleteOrganizacion = deleteOrganizacion;
//# sourceMappingURL=organizaciones.controller.js.map