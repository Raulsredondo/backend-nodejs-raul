// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

// Inicializar variables
var app = express();


// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Setings
app.use(morgan('dev'));
app.set('port', process.env.PORT || 3000)

// Importar rutas
var appRoutes = require('./routes/app'); 
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');



// Rutas
app.use('/api/usuario', usuarioRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/', appRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/medico', medicoRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);


// Escuchar peticiones
app.listen(app.get('port'), () => {
    console.log('Express server puerto '+app.get('port')+': \x1b[32m%s\x1b[0m', 'online');
});