const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Documentación',
    description: 'Documentación automática de la API con Swagger',
  },
  host: 'localhost:3001',  // Asegúrate de que coincida con tu configuración
  schemes: ['http'],
};

const outputFile = './swagger-output.json';  // Aquí se generará el archivo de documentación
const endpointsFiles = ['./app.js'];  // Archivo principal donde se encuentran tus rutas

swaggerAutogen(outputFile, endpointsFiles, doc);