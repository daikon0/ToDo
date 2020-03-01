'use strict';
const request = require('supertest');
const app = require('../app');
const passportStub = require('passport-stub');
const User = require('../models/user');
const Schedule = require('../models/schedule');

describe('/login', () => {
  before(() => {
    passportStub.install(app);
    passportStub.login({ username: 'testuser' });
  });

  after(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  it('ログインのためのリンクが含まれる', (done) => {
    request(app)
      .get('/login')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<a href="\/auth\/github"/)
      .expect(200, done);
  });

  it('ログイン時はユーザー名が表示される', (done) => {
    request(app)
      .get('/login')
      .expect(/testuser/)
      .expect(200, done);
  });

  it('/logoutにアクセスをした際に/にリダイレクトされる', (done) => {
    request(app)
      .get('/logout')
      .expect('Location', '/')
      .expect(302, done)
  });

  it('やることが作成でき、表示される', (done) => {
    User.upsert({ userId: 0, username: 'testuser'}).then(() => {
      request(app)
        .post('/schedules')
        .send({ scheduleName: 'やることテスト' })
        .expect('Location', '/')
        .expect(302)
        .end((err, res) => {
          request(app)
            //sessionを修正したら通るはず
            .get('/')
            .expect('やることテスト')
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              Schedule.findByPk(scheduleName).then((s) => {
                s.destroy().then(() => {
                  if (err) return done (err);
                  done();
                });
              });
            });
        });
    });
  });

});