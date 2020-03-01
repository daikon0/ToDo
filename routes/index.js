const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const authenticationEnsurer = require('./authentication-ensurer');

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

router.post('/:scheduleId', authenticationEnsurer, (req, res, next) => {
    if (parseInt(req.query.delete) === 1) {
      console.log('if通ってる');
      
      deleteScheduleAggregate(req.params.scheudleId, () => {
        res.redirect('/');
      });
    } else {
      const err = new Error('不正なリクエストです');
      err.status = 400;
      next(err);
    }
  });

function deleteScheduleAggregate(scheudleId, done, err) {
  Schedule.findById(scheudleId).then((scheudleId) => {
    return scheudleId.destroy();
  })
}

module.exports = router;
