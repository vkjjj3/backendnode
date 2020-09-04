const express = require('express');
/*const dotenv =*/ require('dotenv').config();
//const bodyParser = require('body-parser');
const { dbConnection } = require('./database/config');
//const jsonParser = bodyParser.json(); 
//const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require('cors');

//console.log(process.env);

//crear servidor de express
const app = express();

//conexion base de datos
    dbConnection(); 

//CORS
app.use(cors());

//lectura y parseo del body
app.use( express.json());
//app.use(bodyParser.json()) 

//directorio publico
app.use(express.static('public'));

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//escuchar peticiones 
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`, )
})

