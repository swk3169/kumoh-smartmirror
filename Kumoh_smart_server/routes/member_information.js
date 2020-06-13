var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

var mysql_dbc = require('../commons/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

var date = new Date();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) { //로그인이 된 상태면
    var stmt_duplicated = 'select * from `user` where `user_id` = ?';
    connection.query(stmt_duplicated, req.user.user_id, function (err, result) {
      if (err) {
        return done(err);
      } else {
        if (result[0].length === 0) {
          //조회하려는 자신의 회원정보가 불러와지지 않았을 때!
          res.render('member_information', {
            title: "회원정보 수정",
            member: "회원정보가 로딩되지 않습니다. 재접속 하시거나 그래도 문제가 있으시면 관리자에게 연락주세요!",
            classification: "null",
            entrance_school_year: "null"
          });
        } else {
          //조회하려는 자신의 회원정보가 성공적으로 로드 되었을 때!
          if (result[0].entrance_school_year == null) {
            res.render('member_information', {
              title: "회원정보 수정",
              member: req.user.nickname + "의 회원정보 수정",
              classification: result[0].classification,
              entrance_school_year: result[0].entrance_school_year,
              image_address: result[0].image_address
            });
          } else {
            res.render('member_information', {
              title: "회원정보 수정",
              member: result[0].entrance_school_year.toString().substring(2, 4) + " " + req.user.nickname + "의 회원정보 수정",
              classification: result[0].classification,
              entrance_school_year: result[0].entrance_school_year,
              image_address: result[0].image_address
            });
          }
        }
      }
    });
  } else { //로그인이 되지 않은 상태라면
    res.render('member_information', {
      title: "회원정보 수정",
      member: "null",
      classification: "null",
      entrance_school_year: "null"
    });
  }
});

router.get('/submit', function (req, res, next) {
  res.redirect('/');
});

router.post('/submit', function (req, res, next) {
  if (res.statusCode == 404) {
    console.log("server :: wrong input data in edit_member");
  } else {
    var stmt_duplicated = 'update `user` set `classification` = ?, `entrance_school_year` = ? where `user_id` = ?';
    connection.query(stmt_duplicated, [req.body.radio_classification, req.body.entrance_school_year, req.user.user_id], function (err, result) {
      if (err) {
        return done(err);
      } else {
        res.redirect("/member_information");
      }
    });
  }
});

module.exports = router;
