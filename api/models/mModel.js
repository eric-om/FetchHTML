'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the url'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['in progress', 'failed', 'completed']
    }],
    default: ['in progress']
  },
  html: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('Tasks', TaskSchema);