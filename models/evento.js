var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;




var eventoSchema = new Schema({


    usuid: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
    usuemail: { type: String, unique: false },
    title: { type: String },
    desc: { type: String },
    serviociosele: { type: String},
    startTime: { type: String, unique: true, required: true},
    endTime: { type: String, required: true},
    allDay: { type: Boolean },

});




module.exports = mongoose.model('Evento', eventoSchema);