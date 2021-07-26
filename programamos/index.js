const express = require("express");
const app = express();
//app.use(express.urlencoded({extended: false}));
app.use(express.json());  //eso es para requerir del body del metodo POST por medio de json

//Inicializamos el Server en el puerto 3000
app.listen(3000, () => {
    console.log("El servidor está inicializando en el puerto 3000");
});

//Inicializamos un Objeto Pais
let paises = [];

//Inicializamos un Objeto respuesta
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
}

//Creamos un método GET raiz como punto de inicio 
app.get('/', function(req,res){
    //creamos la respuesta
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Punto de inicio'
    }
    res.send(respuesta);
});

//Creamos el método GET para ver el pais
app.get('/paises', function(req, res){
    if (paises.length===0){
        //Si el país NO existe modificamos la respuesta
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'No ha sido creado ningun pais'
        };
    } else {
        //Si el pais SI existe generamos la respuesta
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Listado de paises',
            respuesta: paises
        };
    }
    //Imprimos respuestas
    res.send(respuesta);
});

//Creamos el método POST para crear el país
app.post('/paises', function(req, res){
    console.log(req.body);
    //console.log('Body POST: '+JSON.stringify(req.body));  
    if (!req.body.nombre || !req.body.habitantes) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre y habitaciones son requeridos'
        };
    } else {
        if (paises.find(element => element.nombre == req.body.nombre)){
            respuesta = {
                error: true,
                codigo: 503,
                mensaje: 'El pais ya fue creado'
            };
        }else {
            //Si el pais No existe,lo creamosy generamos la respuesta
            paises.push({
                nombre: req.body.nombre,
                habitantes: req.body.habitantes
            })
            respuesta = {
                error:false,
                codigo: 200,
                mensaje: 'pais creado',
                respuesta: paises
            };
        }
    }
    //Imprimimos respuestas
    res.send(respuesta);
});

//Creamos el método PUT para Actualizar el pais
app.put('/paises/:pais', function (req, res){
    if (!req.body.nombre || !req.body.habitantes) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre y habitaciones son requeridos'
        };
    } else {
        let indice = paises.findIndex(element => element.nombre == req.params.pais);
            //SI NO tenemos un pais creado para modificar 
        if (indice ==-1){
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: 'El pais no ha sido creado'
            };
        }else {
            //Si el pais SI existe, lo actualizamos y generamos la respuesta
            paises[indice] = {
                nombre: req.body.nombre,
                habitantes: req.body.habitantes
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'pais actualizado',
                respuesta: paises[indice]
            };
        }
    }
    //Imprimimos respuesta
    res.send(respuesta);
});

//Creamos el método DELETE para eliminar el pais
app.delete('/paises/:nombre', function(req, res){
    let pais = paises.findIndex(element => element.nombre == req.params.nombre);
    //si no existe el pais
    if (pais == -1) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El pais no ha sido creado'
        };
    } else {
        //Si hay un pais creado, lo eliminamos
        paises.splice(pais,1);
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'pais eliminado'
        }
    }
    //Imprimimos respuesta
    res.send(respuesta);
});