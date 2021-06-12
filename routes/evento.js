var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Evento = require('../models/evento');


app.get('/', mdAutenticacion.verificaToken, (req, res, next) => {

    Evento.find({}, '_id usuid usuemail title desc serviociosele startTime endTime allDay')
        .exec(
            (err, eventos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Evento',
                        errors: err
                    });
                }

                res.status(200).json({
                    
                     eventos
                });



            });
});




app.get('/:id', mdAutenticacion.verificaToken, (req, res, next) => {

    var id = req.params.id;

    Evento.find({usuid: id}, '_id usuid usuemail title desc serviociosele startTime endTime allDay')
        .exec(
            (err, eventos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando medico',
                        errors: err
                    });
                }

                res.status(200).json({
                    
                     eventos
                });



            });
});

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Evento.findByIdAndRemove(id, (err, eventoborrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar evento',
                errors: err
            });
        }
  
 

        if (!eventoborrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un evento con ese id',
                errors: { message: 'No existe un evento con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            evento: eventoborrado
        });

    });

});

app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    

    var body = req.body;
    console.log(body);
    var evento = new Evento({
        usuid: body.usuid,
        usuemail: body.usuemail,
        title: body.title,
        desc: body.desc,
        serviociosele: body.serviociosele,
        startTime: body.startTime,
        endTime: body.endTime,
        allDay: body.allDay
    });


    evento.save((err, eventoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear evento',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            evento: eventoGuardado,
        });


    });

});

module.exports = app;