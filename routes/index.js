const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const homeController = require('../controller/homeController');
const userController = require('../controller/userController');
const userRequest = require('../request/userRequest');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definição de opções do Swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Users API',
        version: '1.0.0',
        description: 'API para gerenciar usuários',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor de desenvolvimento',
        },
      ],
    },
    apis: ['./controller/userController.js', './controller/authController.js'], // Arquivos que contêm os comentários JSDoc
};
  
// Geração da especificação do Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware para servir a documentação Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.route('/users').get(userController.list);
router.route('/users/:id').get(userController.findId);
router.route('/users').post( userRequest.addOrUp, userController.add);
router.route('/users/:id').put(userRequest.addOrUp, userController.up);
router.route('/users/:id').delete(userController.del);

router.route('/users/login').post( userRequest.login, authController.login);
router.route('/chat/:hash').get( homeController.home );

module.exports = router