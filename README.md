# Práctica WEB-API/Node.js/MongoDB


### Instalación

	$ git clone https://github.com/siono/4-KC-Practica-NodeJS.git
	$ cd nodepop
	$ npm install

### Arrancar MongoDB

	$ bin/mongod --dbpath ./data/db --directoryperdb

### Arrancar la base de datos

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
```sh
{
    "success": true,
    "rows": [
        {
            "_id": "59be5438ab64180be87744aa",
            "nombre": "Coche",
            "venta": true,
            "precio": 400,
            "foto": "coche.jpg",
            "__v": 0,
            "tags": [
                "mobile"
            ]
        },
        {
            "_id": "59be55cfab64180be87744ac",
            "nombre": "Avion",
            "venta": true,
            "precio": 5000,
            "foto": "avion.jpg",
            "__v": 0,
            "tags": [
                "mobile",
                "lifestyle"
            ]
        }
    ]
}
```