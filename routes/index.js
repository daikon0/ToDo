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
  Schedule.findOne({ 
    where: {
      scheduleId: req.params.scheduleId
    }
  }).then(()　=> {
    if (parseInt(req.query.delete) === 1) {
      console.log('if通ってる');
      console.log(req.params.scheduleId);
      

      deleteScheduleAggregate(req.params.scheduleId, () => {
        res.redirect('/');
      });
    } else {
      const err = new Error('不正なリクエストです');
      err.status = 400;
      next(err);
    }
  });
});

function deleteScheduleAggregate(scheduleId, done, err) {
  Schedule.findAll({
    where: { scheduleId: scheduleId}
  }).then((schedule) => {
    const promises = schedule.map((s) => { return s.destroy(); });
    return Promise.all(promises);
  }).then(() => {
    if (err) return done (err);
    done();
  });
}

module.exports = router;
