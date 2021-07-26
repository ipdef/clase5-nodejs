const { request } = require('express');
const express = require('express');
const server = express();

server.use(express.json());

var telefonos = [];

server.get('/telefonos', function(req, res){
    res.send(telefonos);
});

server.post('/telefonos', function(req, res){
    if(telefonos.find(element => element.marca == req.body.marca)){
        res.json ({
            error: true,
            mensaje: "El modelo ya existe"
        });
    } else {
        telefonos.push({
            marca: req.body.marca,
            modelo: req.body.modelo,
            precio: req.body.precio
        });
        res.json({
            error: false,
            mensaje: "Telefono agregado con exito"
        });
    }
});

server.put('/telefonos/:marca', function(req, res){

    let indice = telefonos.findIndex(element => element.marca == req.params.marca);
     
    if(indice == -1){
        res.json ({
            error: true,
            mensaje: "El modelo no ha sido creado"
        });
    } else {
        telefonos[indice] ={
            marca: req.body.marca,
            modelo: req.body.modelo,
            precio: req.body.precio
        };
        res.json({
            error:false,
            mensaje: "El modelo ha sido actualizado con exito"
        });
    }
});

server.delete('/telefonos/:marca', function(req, res){
    
    let indice = telefonos.findIndex(element => element.marca == req.params.marca);

    if(indice == -1){
        res.json ({
            error: true,
            mensaje: "El telefono no existe"
        });
    } else {
        telefonos.splice(indice, 1);
        res.json ({
            error: false,
            mensaje: "Telefono eliminado con exito"
        });
    }
});

//buscar
server.get('/telefonos?preciomenorque=500', function(req, res){
    let indice = telefonos.findIndex(element => element.precio == req.query.precio == 500);
    if(indice == -1){
        res.json ({
            error:true,
            mensaje: "El telefono no existe"
        });
    } else {
        telefonos[indice] ={
            marca: req.body.marca,
            modelo: req.body.modelo,
            precio: req.body.precio
        };
        res.json({
            error:false,
            mensaje: "Telefono encontrado con exito"
        });
    }
})

//levantar el servidor
server.listen(3000, () => {
    console.log ("Servidor Iniciado...");
});