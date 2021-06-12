var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var CryptoJS  =require('crypto-js');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Usuario = require('../models/usuario');


app.post('/', (req, res) => {

    var body = req.body;

    var desencriptado1 = CryptoJS.AES.decrypt(body.password, body.email);

    var desencriptado2 = CryptoJS.enc.Utf8.stringify(desencriptado1).toString();

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(desencriptado2, 10),
        img: body.img,
        role: body.role
    });

    if (req.file) {
        const { filename } = req.file
        usuario.setImg(filename)
    }

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario'+desencriptado2,
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            contraseña: desencriptado2,
            usuariotoken: req.usuario
        });


    });

});

module.exports = app;