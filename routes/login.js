var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var CryptoJS  =require('crypto-js');

var SEED = require('../config/config').SEED;

var app = express();
var Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    var body = req.body;
    var desencriptado1 = CryptoJS.AES.decrypt(body.password, body.email);

    var desencriptado2 = CryptoJS.enc.Utf8.stringify(desencriptado1).toString();
    

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(desencriptado2, usuarioDB.password)) {
            return res.status(401).json({
                ok: false,
                mensaje: desencriptado2 + body.email,
                errors: err
            });
        }
        
        // Crear un token!!!
        usuarioDB.password = ':)';

        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id,  
            role: usuarioDB.role,
            nombre: usuarioDB.nombre,
            email: usuarioDB.email,
            password: usuarioDB.password,
            img: usuarioDB.img
        });

    })


});





module.exports = app;