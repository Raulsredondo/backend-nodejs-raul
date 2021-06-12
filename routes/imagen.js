var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Imagenes = require('../models/imagenes');

// ==========================================
// Obtener todos los usuarios
// ==========================================
app.get('/', mdAutenticacion.verificaToken, (req, res, next) => {

    Img.find({}, '_id, img')
        .exec(
            (err, imagenes) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando img',
                        errors: err
                    });
                }

                res.status(200).json({
                    
                     imagenes
                });



            });
});




// ==========================================
// Crear un nuevo 
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;
    

    var imges = new Imagenes({
        
        imagen: body.imagen,
    });
    
    if (req.file) {
        const { filename } = req.file
        usuario.setImg(filename)
    }

    imges.save((err, imgGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            imagen: imgGuardado,
            usuariotoken: req.usuario
        });


    });

});


// ============================================
//   Borrar un usuario por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});


module.exports = app;