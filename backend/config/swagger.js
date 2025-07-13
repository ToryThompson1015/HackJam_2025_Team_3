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
      schemas: {
        Achievement: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            user: { type: 'string' },
            type: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            date: { type: 'string', format: 'date' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Engagement: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            user: { type: 'string' },
            type: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            date: { type: 'string', format: 'date' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Point: {
          type: 'object',
          properties: {
            user: { type: 'string' },
            totalPoints: { type: 'integer' },
            lastLogin: { type: 'string', format: 'date-time' },
            streak: { type: 'integer' }
          }
        },
        UserBadge: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            user: { type: 'string' },
            badge: { type: 'object' }, // You can further define the badge schema if you want
            dateAwarded: { type: 'string', format: 'date-time' }
          }
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            location: { type: 'string' },
            role: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
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