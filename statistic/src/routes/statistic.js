const router = require('express').Router();
const controller = require('../controllers/controller');

router
  .get('/', controller.getAll)
  .post('/', controller.new);

module.exports = router;