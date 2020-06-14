const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.yaml');
module.exports = router;
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
