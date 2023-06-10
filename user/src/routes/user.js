const router = require('express').Router();
const controller = require('../controllers/controller');

router
  .get('/', controller.getAll)
  .post('/', controller.new)
  // .get('/:id', controller.getOne)
  // .patch('/:id', controller.updateOne)
  // .delete('/:id', controller.deleteOne)
  .get('/get', controller.get)
  .get('/role', controller.isAdmin)

module.exports = router;