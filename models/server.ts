import express, { Application } from 'express';
import repositoriosRoutes from '../routes/repositorios.routes';
import organizacionesRoutes from '../routes/organizaciones.routes';
import tribusRoutes from '../routes/tribus.routes';
import metricasRoutes from '../routes/metricas.routes';
import downloadsRoutes from '../routes/downloads.routes';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port:string;
    private apiPaths = {        
        organizaciones: '/api/organizaciones',
        tribus:'/api/tribus',
        repositorios:'/api/repositorios',
        metricas:'/api/metricas',
        download:'/api/downloads',
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';

        //DB
        this.dbConnection();
        
        //Métodos Iniciales
        this.middlewares();
        this.routes();
    }

    //Conectar BD
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Authenticated!!!');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //Lectura del Body
        this.app.use( express.json() );

        //Public
        this.app.use( express.static( 'public' ) );
    }

    routes(){        
        this.app.use( this.apiPaths.organizaciones, organizacionesRoutes ),
        this.app.use( this.apiPaths.tribus, tribusRoutes ),
        this.app.use( this.apiPaths.repositorios, repositoriosRoutes ),
        this.app.use( this.apiPaths.metricas, metricasRoutes ),
        this.app.use( this.apiPaths.download, downloadsRoutes )
        
    }

    listen(){
        this.app.listen( this.port, () => {
          
            console.log('Servidor listening on port ' + this.port + ' YEAH!!!!!');
        } );
    }
}

export default Server;