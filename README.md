# Práctica WEB-API/Node.js/MongoDB


### Instalación

	$ git clone https://github.com/siono/4-KC-Practica-NodeJS.git
	$ cd nodepop
	$ npm install

### Arrancar MongoDB

	$ bin/mongod --dbpath ./data/db --directoryperdb

### Script de carga de ejemplos para la Base de datos.

	$ npm run installBD
      
### Arrancar servidor

	$ nodemon
      


### OPERACIONES API

A continuación detallamos las operaciones que están disponibles en la API.

#### Listar Tags 

* [Objetivo] - Lista de tags existentes
* [Metodo] - GET
* [URL] - http://localhost:3000/apiv1/anuncios/tags
* [Salida]

```sh
{
"sucess": true,
"result": [
	"work",
	"lifestyle",
	"motor",
	"mobile"
	]
}
```
#### Listar Anuncios con filtros y paginados.

* [Objetivo] - Lista de anuncios paginada. Con filtros por tag, tipo de anuncio (venta o búsqueda),
rango de precio (precio min. y precio max.) y nombre de artículo (que empiece por el
dato buscado).
* [Metodo] - GET
* [URL_base] - http://localhost:3000/apiv1/anuncios/
* [Filtros disponibles]
	* nombre: Nombre de artículo, que empiece por el dato buscado en el parámetro nombre.
	* precio: Rango de precio (precio min. y precio max.) separado por - .
	* tags: Tag del articulo
	* venta: tipo de anuncio (venta o búsqueda).
* [Paginación]
	* skip
	* limit

* [URL_ejemplo - http://localhost:3000/apiv1/anuncios?precio=50-&tag=mobile&venta=true&skip=1&limit=2

* [Salida]:
    * success: (true/false): Nos devuelve si la consulta al api ha tenido éxito.
    * rows: articulos recuperados
    * totalRecords: número total de elementos encontrados sin limite de paginación.
```sh
{
success: true,
rows: [
    {
    _id: "59c25e2b28cf161742bc807e",
    nombre: "Coche",
    venta: true,
    precio: 400,
    foto: "coche.jpg",
    __v: 0,
    tags: [
        "mobile"
    ]
    },
    {
    _id: "59c25e2b28cf161742bc807f",
    nombre: "Moto",
    venta: true,
    precio: 500,
    foto: "moto.jpg",
    __v: 0,
    tags: [
    "mobile",
    "lifestyle"
    ]
    }
    ],
totalRecords: 5
}
```
#### Crear Anuncios 

* [Objetivo] - Crear anuncios en la BBDD.
* [Metodo] - POST
* [URL] - 
* [Salida]-

```sh

```

#### Errores

Los errores en el API, son mostrados por defecto en inglés (EN), se podrá cambiar a Español pasando las consultas con el parámetro lang=es.  