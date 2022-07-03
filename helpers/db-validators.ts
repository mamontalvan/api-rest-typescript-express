import Organizacion from '../models/organizacion';
import Repositorio from '../models/repositorio';
import Tribu from '../models/tribu';


export const validaIdOrganizacion = async(idOrganizacion:number) => { 

    if (!!idOrganizacion) {

        if(!isNaN(idOrganizacion)){
            
            const organizacion = await Organizacion.findByPk(idOrganizacion);

            if( !organizacion){
    
                throw new Error(`El ID de la Organización: ${ idOrganizacion } no es válido.`)
    
            }

            return true;

        }else{

            throw new Error(`El ID de la Organización: ${ idOrganizacion } debe ser un valor numérico`)
        }

    }
}

export const validaNombreOrganizacion = async( nameOrganizacion:string) => { 

    if (!!nameOrganizacion) {

        const existeNombre = await Organizacion.findOne({
            where:{
                name: nameOrganizacion.toUpperCase()
            }
        });

        if( existeNombre ){

            throw new Error(`La Organización con nombre: ${nameOrganizacion} ya se encuentra registrada!`)
        }  

        return true;
    }
}


export const validaIdTribu = async(idTribu:number) => { 

    if (!!idTribu) {

        if(!isNaN(idTribu)){

            const organizacion = await Tribu.findByPk(idTribu);

            if( !organizacion){
    
                throw new Error(`El ID de la Tribu: ${ idTribu } no es válido.`)
    
            }
    
            return true;

        }else{

            throw new Error(`El ID de la Organización: ${ idTribu } debe ser un valor numérico`)
        }
    }
}


export const validaNombreTribu = async( nameTribu:string) => { 

    if (!!nameTribu) {

        const existeNombre = await Tribu.findOne({
            where:{
                name: nameTribu.toUpperCase()
            }
        });

        if( existeNombre ){

            throw new Error(`La Tribu con nombre: ${nameTribu} ya se encuentra registrada!`)
        }  

        return true;
    }
}



export const validaNombreRepositorio = async( nameRepositorio:string) => { 

    if ( !!nameRepositorio ) {

        const existeNombre = await Repositorio.findOne({
            where:{
                name: nameRepositorio.toUpperCase()
            }
        });

        if( existeNombre ){

            throw new Error(`El Repositorio con nombre: ${nameRepositorio} ya se encuentra registrado!`)
        }  

        return true;
    }
}


export const validaIdRepositorio = async(idRepositorio:number) => { 

    if (!!idRepositorio) {

        if(!isNaN(idRepositorio)){
            
            const repositorio = await Repositorio.findByPk(idRepositorio);

            if( !repositorio){
    
                throw new Error(`El ID del Repositorio: ${ idRepositorio } no es válido.`)
    
            }

            return true;

        }else{

            throw new Error(`El ID del Repositorio: ${ idRepositorio } debe ser un valor numérico`)
        }

    }
}