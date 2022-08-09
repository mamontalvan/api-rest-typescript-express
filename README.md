
# Descripción:

El presente proyecto fue implementado con Typescript y base de datos [CockroachDb](https://www.cockroachlabs.com/), empleando Sequelize para la persistencia hacia la BD.

Dado el siguiente modelo de datos, responder a los ejercicios siguientes:

<img width="629" alt="Screen Shot 2022-08-08 at 8 32 24 PM" src="https://user-images.githubusercontent.com/1218979/183551696-d9c07a0c-eaf3-4263-b4c7-aefb6852ccaf.png">

### E1: Con el objetivo de mostrar el tipo de verificación que posee un repositorio, como administrador de la plataforma, quiero tener un servicio GET simulado que retorne la siguiente respuesta:

```
{
  "repositories": [
    {
      "id": 1,
      "codigoVerificacion": 604
    },
    {
      "id": 2,
      "codigoVerificacion": 605
    },
    {
      "id": 3,
      "codigoVerificacion": 606
    }
  ]
}
```
Criterio de Aceptación: Dado que quiero obtener los códigos de verificación de mis repositorios, cuando hago una petición tipo GET al servicio simulado, entonces se debe retornar los identificadores de los repositorios con su código de verificación.

Solución: URL Endpoint: https://api-rest-ts-nodejs.herokuapp.com/api/repositorios

### E2: Con el objetivo de poder administrar las organizaciones dentro de mi plataforma, como administrador de la plataforma, quiero tener una API que me permita crear, editar, obtener y eliminar organizaciones:

- Escenario 1: Crear organización: 

Solución: URL Endpoint: https://api-rest-ts-nodejs.herokuapp.com/api/organizaciones

```
    Método: POST
    Input:
    {
    "name": "Organizacion25",
    "status": 1
    }
```
- Escenario 2: Editar organización:

Solución: URL Endpoint: https://api-rest-ts-nodejs.herokuapp.com/775924533297610754

```
    Método: PUT
    Input: ID de la Organización
    Input Body(data):
    {
    "name": "XXXYYYZZZ",
    "status": 0
    }
```

- Escenario 3: Obtener organizaciones:

Solución: URL Endpoint: https://api-rest-ts-nodejs.herokuapp.com/api/organizaciones

```
    Método: GET

```

- Escenario 4: Eliminar organizaciones: (Nota: no se eliminó físicamente el registro, la eliminación consiste en inactivar la Organización)

Solución: URL Endpoint: https://api-rest-ts-nodejs.herokuapp.com/api/organizaciones/776002106434748418

```
    Método: DELETE

```

### E3: Métricas

- Escenario 1: Obtener los repositorios creados en este año, con estado 'ENABLE' y cobertura > 75% 
Solución: URL Endpoint: https://api-rest-ts-nodejs.herokuapp.com/api/metricas/776023841236811778

```
    Método: GET
    Input: ID de la Tribu

```

### E4: Permitir la descarga de un archivo csv del reporte antes solicitado

Solución:  URL Endpoint: https://api-rest-ts-nodejs.herokuapp.com/api/downloads/idTribu

```
    Input: ID de la Tribu
```

# Documentación EndPoints:
https://documenter.getpostman.com/view/2432353/UzJFvJKy
