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
const express_1 = __importDefault(require("express"));
const repositorios_routes_1 = __importDefault(require("../routes/repositorios.routes"));
const organizaciones_routes_1 = __importDefault(require("../routes/organizaciones.routes"));
const tribus_routes_1 = __importDefault(require("../routes/tribus.routes"));
const metricas_routes_1 = __importDefault(require("../routes/metricas.routes"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            organizaciones: '/api/organizaciones',
            tribus: '/api/tribus',
            repositorios: '/api/repositorios',
            metricas: '/api/metricas'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        //DB
        this.dbConnection();
        //Métodos Iniciales
        this.middlewares();
        this.routes();
    }
    //Conectar BD
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Authenticated!!!');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura del Body
        this.app.use(express_1.default.json());
        //Public
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.organizaciones, organizaciones_routes_1.default),
            this.app.use(this.apiPaths.tribus, tribus_routes_1.default),
            this.app.use(this.apiPaths.repositorios, repositorios_routes_1.default),
            this.app.use(this.apiPaths.metricas, metricas_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor listening on port ' + this.port + ' YEAH!!!!!');
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map