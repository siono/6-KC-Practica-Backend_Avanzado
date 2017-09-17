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

#### Litar Tags de los Anuncios

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