const router = require('express').Router();
const controller = require('../controllers/controller');

router
  .get('/', controller.getAll)
  .get('/notice', controller.getNotice)
  .post('/', controller.new)
  //.get('/:historyUid', controller.getOne)
  //.patch('/:historyUid', controller.updateOne)
  //.delete('/:historyUid', controller.deleteOne)
  .get('/set/:setUid', controller.get)
  .patch('/set/:setUid', controller.update);

module.exports = router;