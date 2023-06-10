const router = require('express').Router();
const controller = require('../controllers/categoryController');

router
  .get('/', controller.getAll)
  .post('/', controller.new)
  .get('/:id', controller.getOne)
  .patch('/:id', controller.updateOne)
  .delete('/:id', controller.deleteOne);

module.exports = router;