const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

/* GET home page. */
router.get('/', function(req, res, next) {
  const title = 'ToDoリスト'
  if (req.user) {
    Schedule.findAll({
      where: {
        createdBy: req.user.id
      },
      order: [['"updatedAt"', 'DESC']]
    }).then((schedules) => {
      console.log(schedules.length);
      
      res.render('index', {
        title: title,
        user: req.user,
        schedules
      });
    });
  } else {
    res.render('index', { title: title});
  }
});

module.exports = router;
