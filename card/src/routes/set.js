const router = require('express').Router();
const controller = require('../controllers/setController');

router
  .get('/', controller.getSets)
  .get('/learned', controller.getLearned)
  .post('/', controller.newSet)
  .get('/:setUid', controller.getSet)
  .patch('/:setUid', controller.updateSet)
  .delete('/:setUid', controller.deleteSet)
  .post('/:setUid', controller.copySet);

module.exports = router;