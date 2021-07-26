const express = require('express');
const servidor = express();

//endpoint
servidor.get('/',function(req,res){
    res.json('funciona');
});

servidor.get('/prueba-get',function(req,res){
    res.json('funciona la prueba de metodo GET');
});

servidor.post('/prueba-post',function(req,res){
    res.json('funciona la prueba de metodo POST')
});

servidor.put('/prueba-put',function(req,res){
    res.json('funciona la prueba de metodo PUT')
});

servidor.delete('/prueba-delete',function(req,res){
    res.json('funciona la prueba de metodo DELETE')
});

servidor.listen(4000,()=>{
    console.log('Servidor Escuchando');
});