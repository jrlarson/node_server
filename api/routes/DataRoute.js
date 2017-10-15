'use strict';
const dataController = require('../controllers/DataController');

module.exports = function(app) {

  // Data Routes
  app.route('/data')
    .get(dataController.get_data)
};