var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;




var eventoSchema = new Schema({
    imagen: { type: String, unique: true },

});




module.exports = mongoose.model('Imagen', eventoSchema);