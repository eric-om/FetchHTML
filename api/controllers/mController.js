'use strict';
var request = require('request');
var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.default = function(req, res) {
  let msg = "Hello! </br></br>\
    Endpoints: </br>\
    To view all task objects: \\tasks </br>\
    For a single task: \\tasks\\:taskId </br>\
    To submit a task: \\tasks\\submit\\"
  res.send(msg);
};

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.send('Your task id is ' + task._id);

    request(req.body.name, function (error, response, body) {
      if (error) {
        Task.findOneAndUpdate({ "_id": task._id }, { "$set": { status: 'failed' }}).exec(function(err, task){
          if(err) {
            console.log(err);
          }
        });
        return console.log(error);
      }
      Task.findOneAndUpdate({ "_id": task._id }, { "$set": { status: 'completed', html: body }}).exec(function(err, task){
        if(err) {
          console.log(err);
        }
      });
    });
  });
};


exports.read_a_task = function(req, res) {

  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    if (task.status[0] === 'completed') { // not sure why task.status is an array
      res.send(task.html);
    }
    res.send(task.status)[0];
  });
};