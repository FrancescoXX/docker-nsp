const controller = require('../controllers/' + 'users');
const router = require('express').Router();

//CRUD Model-Agnostic. 
//Keep them at the end of the route file for url parsing requests
router
  .get('/', controller.getAll)
  .get('/:id', controller.getOne)
  .post('/', controller.createOne)
  .put('/:id', controller.updateOne)
  .delete('/:id', controller.deleteOne);

module.exports = router;