# Práctica WEB-API/Node.js/MongoDB


### Instalación

	$ git clone https://github.com/siono/6-KC-Practica-Backend_Avanzado.git
	$ cd nodepop
	$ npm install

### Arrancar MongoDB

	$ bin/mongod --dbpath ./data/db --directoryperdb

### Iniciar la BBDD con ejemplos precargados.

	$ npm run installBD
      
### Arrancar servidor

	$ nodemon
      
---

### INTERNACIONALIZACIÓN

Se han traducido los mensajes proporcionados por el frontal (menos la API) con i18n. Se dispone de un selector de idioma(ESPAÑOL e INGLES.)

---

### TESTING

Para realizar los test debemos ejecutar 

$ npm run e2e

Se implementan 4 test con resultado positivo y 1 con resultado negativo.

```sh
POST /apiv1/authenticate 200 23.841 ms - 194
    ✓ login (46ms)
GET /apiv1/anuncios/ 200 12.791 ms - 313
    ✓ Show ads, should return 200 and format json
GET /apiv1/anuncios?precio=50-&tag=mobile&venta=true&skip=1&limit=2 200 5.236 ms - 43
    ✓ Search ads, should return 200 and format json
.field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()
POST /apiv1/anuncios 200 7.072 ms - 77
    ✓ Create ad, should return 200 and format json
.field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()
    1) Create ad, show error if send a number


  4 passing (486ms)
  1 failing

  1) Check API Nodepop
       Create ad, show error if send a number:
     TypeError: "string" must be a string, Buffer, or ArrayBuffer
      at Function.byteLength (buffer.js:475:11)
      at Test.Request._end (node_modules/superagent/lib/node/index.js:791:84)
      at Test.Request.end (node_modules/superagent/lib/node/index.js:764:15)
      at Test.end (node_modules/supertest/lib/test.js:125:7)
      at Test.expect (node_modules/supertest/lib/test.js:87:37)
      at Context.<anonymous> (e2e/api.spec.js:63:10)
```
---

### OPERACIONES API

A continuación detallamos las operaciones que están disponibles en la API.


Autenticacín JWT__

Todas las operaciones a la API deben pasar por autenticación mediante JWT.

* [Objetivos] - Autenticación JWT
* [Método] - POST
* [URL] - http://localhost:3000/apiv1/authenticate
* [DATA] - Email y Contraseña del usuario a aunteticar.
    * Ejemplo: ```{
    "email": "user@example.com",
    "password": "1234"
  }```
* [SALIDA]
```sh
{
    "ok": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZiNGVjYWQ4MmUyZDMzODcwN2Y4Y2YiLCJpYXQiOjE1MDk3ODA5MjgsImV4cCI6MTUwOTc4MTUyOH0.PZQlgFJ88t-MnZuns3HfMwMN2Gyw8nuw6GNXfQqd0BQ"
}
```

Si la autenticación no es correcta devolverá:

```sh
{
    "ok": false,
    "error": "invalid credentials"
}
```


### Las operaciones a continuación descritas deberán pasar el token de autenticación para tener el resultado esperado. 


* Resultado sin token:

    * Ej: http://localhost:3000/apiv1/anuncios

```sh
{
"success": false,
"error": "unauthorized"
}
```

* Resultado con token caducado o erroneo:

    * Ej: http://localhost:3000/apiv1/anuncios?token=1234

```sh
{
"success": false,
"error": "token invalid"
}
```

__Operaciones a la API__

#### 1.Listar Tags 

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
#### 2.Listar Anuncios con filtros y paginados.

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

* [URL_Ejemplo] - http://localhost:3000/apiv1/anuncios?precio=50-&tag=mobile&venta=true&skip=1&limit=2

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
#### 3.Crear Anuncios 

* [Objetivo] - Crear anuncios en la BBDD.
* [Metodo] - POST
* [Parametros] - Parametros soportados para la creación de anuncios.
    * nombre: Nombre del articulo.
    * precio: Precio del articulo.
    * venta: true/false
    * tags: Etiqueta del anuncio. Puede ponerse una o varias de la lista de etiquetas disponibles.
    * foto: nombre de la imagen con su extensión de la foto del articulo. Posteriormente deberá subirse al servidor a la ruta /public/images/articles


#### Errores

Los errores en el API, son mostrados por defecto en inglés (EN), se podrá cambiar a Español pasando las consultas con el parámetro lang=es.

[URL_Ejemplo] -http://localhost:3000/apiv1/anuncios?precio=a&lang=es

```sh
{
success: false,
error: "No se ha podido recuperar la información solicitada"
}
```

### EJEMPLO FRONT utilizando el API : http://localhost:3000/
