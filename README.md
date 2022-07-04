
# Descripción:

### E1: Servicio GET que retorna la siguiente respuesta:
```
    URL Endpoint: http://localhost:3000/api/repositorios
    Método: GET
{
  "repositories": [
    {
      "id": 1,
      "state": 604
    },
    {
      "id": 2,
      "state": 605
    },
    {
      "id": 3,
      "state": 606
    }
  ]
}
```
### E2: Administración de Organizaciones

- Escenario 1: Crear organización: 

```
    URL Endpoint: http://localhost:3000/api/organizaciones
    Método: POST
    Input:
    {
    "name": "Organizacion25",
    "status": 1
    }
```
- Escenario 2: Editar organización:

```
    URL Endpoint: http://localhost:3000/api/organizaciones/775924533297610754
    Método: PUT
    Input: ID de la Organización
    Input Body(data):
    {
    "name": "XXXYYYZZZ",
    "status": 0
    }
```

- Escenario 3: Obtener organizaciones:

```
    URL Endpoint: http://localhost:3000/api/organizaciones
    Método: GET

```

- Escenario 4: Eliminar organizaciones:
- Nota: no se eliminó físicamente el registro, la eliminación consiste en inactivar la Organización
```
    URL Endpoint: http://localhost:3000/api/organizaciones/776002106434748418
    Método: DELETE

```

### E3: Métricas

- Escenario 1: Obtener los repositorios creados en este año, con estado 'ENABLE' y cobertura > 75% 

```
    URL Endpoint: http://localhost:3000/api/metricas/776023841236811778
    Método: GET
    Input: ID de la Tribu

```