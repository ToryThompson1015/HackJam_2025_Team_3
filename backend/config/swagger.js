// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HackJam 2025 Team 3 API',
      version: '1.0.0',
      description: 'API documentation for HackJam 2025 Team 3 backend',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: 'http://localhost:3000', // Change port if needed
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs (adjust if your routes are elsewhere)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;