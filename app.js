const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require('./swagger-output.json');  // Archivo generado por swagger-autogen
const app = express();
const dbconnect = require('./config/dbconnect');
const router = require('./routes/index');
const port = process.env.PORT || 3001;

app.use(express.json());

dbconnect();

// Ruta de documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rutas de la API
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});