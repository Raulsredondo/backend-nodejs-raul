// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');

// Inicializar variables
var app = express();


// Conexión a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/peluqueriaDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('../uploads'));
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//Setings
app.use(morgan('dev'));
app.set('port', process.env.PORT || 3000)

app.use('/public', express.static(`${__dirname}/storage/imgs`))

// Importar rutas
var appRoutes = require('./routes/app'); 
var usuarioRoutes = require('./routes/usuario');
var registroRoutes = require('./routes/registro');
var loginRoutes = require('./routes/login');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');
var eventoRoutes = require('./routes/evento');
var imagenRoutes = require('./routes/imagen');



// Rutas
app.use('/', appRoutes);
app.use('/login', loginRoutes);
app.use('/registro', registroRoutes);
app.use('/evento', eventoRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/imagenes', imagenRoutes);




// Escuchar peticiones
app.listen(app.get('port'), () => {
    console.log('Express server puerto '+app.get('port')+': \x1b[32m%s\x1b[0m', 'online');
});