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
exports.getDownload = exports.putMetrica = exports.postMetrica = exports.obtenerRepositoriosPorTribu = void 0;
const metrica_1 = __importDefault(require("../models/metrica"));
const repositorio_1 = __importDefault(require("../models/repositorio"));
const tribu_1 = __importDefault(require("../models/tribu"));
const sequelize_1 = require("sequelize");
const json2csv_1 = require("json2csv");
const organizacion_1 = __importDefault(require("../models/organizacion"));
const obtenerRepositoriosPorTribu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTribu } = req.params;
    const existeTribu = yield tribu_1.default.findByPk(idTribu);
    if (!existeTribu) {
        return res.status(400).json({
            msg: `La Tribu  ${idTribu} no se encuentra registrada`
        });
    }
    const repositorios = yield repositorio_1.default.findAll({
        raw: true,
        attributes: ['id',
            'name',
            [sequelize_1.Sequelize.literal("CASE WHEN \"state\" = 'E' THEN 'Enable' WHEN \"state\" = 'D' THEN 'Disable' ELSE 'Archived' END"), 'state'],
            'codigoVerificacion',
            [sequelize_1.Sequelize.literal("CASE WHEN  \"codigoVerificacion\" = 604 THEN 'Verificado' WHEN  \"codigoVerificacion\" = 605 THEN 'En Espera' ELSE 'Aprobado' END"), 'codigoVerificacion'],
        ],
        where: {
            tribusId: idTribu,
            state: 'E',
            create_time: {
                [sequelize_1.Op.gte]: '2022/01/01',
            }
        },
        include: [
            {
                model: metrica_1.default,
                attributes: ['coverage', 'bugs', 'vulnerabilities', 'hotspot', 'codeSmeell'],
                where: {
                    coverage: {
                        [sequelize_1.Op.gte]: 75,
                    },
                }
            }, {
                model: tribu_1.default, as: "Tribu",
                attributes: [['name', 'tribu']],
                include: [{
                        model: organizacion_1.default, as: "Organizacion",
                        attributes: [['name', 'Organizacion']],
                    },]
            },
        ],
    });
    console.log(repositorios);
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
const getDownload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = [
        {
            key: 'value',
            key2: 'value2'
        },
        {
            key: 'value3',
            key2: 'value4'
        }
    ];
    const fields = ['key', 'key2'];
    const fileName = 'prueba.csv';
    const json2csv = new json2csv_1.Parser({ fields });
    const csv = json2csv.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
});
exports.getDownload = getDownload;
//# sourceMappingURL=metricas.controller.js.map