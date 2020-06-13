var express = require('express');
var router = express.Router();
var secret_config = require('../commons/secret');
var mysql_dbc = require('../commons/db_con')();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

var date = new Date();

function getFormatDate() { //기숙사 식당은 날짜를 꼭 써놓아야 사이트 열람 가능.
  var year = date.getFullYear();    //yyyy
	var month = (1 + date.getMonth());   //M
	month = month >= 10 ? month : '0' + month;  // month 두자리로 저장
	var day = date.getDate();          //d
  day = day >= 10 ? day : '0' + day; //day 두자리로 저장
  return year + '-' + month + '-' + day;
}

router.post('/', function (req, res) {
    var decoded = new Buffer(req.headers.authorization.split('Beare ')[1], 'base64').toString();
    var user_id = decoded.split('|')[0];
    var user_name = decoded.split('|')[1];
    var user_image = decoded.split('|')[2];
    var user_email = decoded.split('|')[3];
    var status = false;

    if(user_image == null) {
      console.log("null");
      user_image = "http://202.31.202.191:443/images/basic_user_image.jpg";
    }

    var stmt_duplicated = 'select * from `user` where `user_id` = ?';
    connection.query(stmt_duplicated, user_id, function (err, result) {
        if (err) {
          return done(err);
        } else {
          if (result.length === 0) {
            // 신규 유저는 회원 가입 이후 로그인 처리
            var stmt_thridparty_signup = 'insert into `user` set `user_id`= ?, `nickname`= ?, `image_address`= ?, `user_email`= ?' ;
            connection.query(stmt_thridparty_signup, [user_id, user_name, user_image, user_email], function (err, result) {
                console.log('New User : ' + user_name + ' Join!');
                status = true;
                res.json({status:status});
            });
          } else {
            //기존유저 로그인 처리
            console.log('Old User : ' + result[0].nickname + ' connected!');
            status = true;
            res.json({status:status});
          }
        }
    });
});



router.post('/isLogin', function (req, res) {
    var decoded = new Buffer(req.headers.authorization.split('Beare ')[1], 'base64').toString();
    var user_id = decoded.split('|')[0];
    var user_name = decoded.split('|')[1];
    var user_image = decoded.split('|')[2];
    var user_email = decoded.split('|')[3];
    var stmt_duplicated = 'select * from `user` where `user_id` = ?';
    var date = getFormatDate();
    connection.query(stmt_duplicated, user_id, function (err, result) {
        if (err) {
          return done(err);
        } else {
          if (result.length === 0) {
            //전달받은 세션 정보가 데이터베이스에 없으면 잘못된 로그인
            res.json({status:"illegal", user_id:user_id, user_name:user_name, user_image:user_image,date:date, user_email:user_email});
          } else if(result[0].user_id != user_id) {
            res.json({status:"illegal", user_id:user_id, user_name:user_name, user_image:user_image,date:date, user_email:user_email}); //DB의 유저ID와 전달받은 값의 복호화 후 ID가 다르면 잘못된 로그인
          } else if(result[0].nickname != user_name) {
            res.json({status:"illegal", user_id:user_id, user_name:user_name, user_image:user_image,date:date, user_email:user_email}); //이거는 이름이 잘못 된 경우
          }else {
            //전달받은 세션 정보가 데이터베이스에 존재하면 성공적인 로그인
            res.json({status:"legal", user_id:user_id, user_name:user_name, user_image:user_image,date:date, user_email:user_email});
          }
        }
    });
});


module.exports = router;

 

 