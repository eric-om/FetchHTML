'use strict';
module.exports = function(app) {
  var controller = require('../controllers/mController');

  // todoList Routes
  app.route('/')
  	.get(controller.default)

  app.route('/tasks')
    .get(controller.list_all_tasks);

  app.route('/tasks/submit/')
    .post(controller.create_a_task);

  app.route('/tasks/:taskId')
    .get(controller.read_a_task)
};
