var express = require('express');
var router = express.Router();
var mysql_dbc = require('../commons/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

router.get('/addFriend', function (req, res) {
    //var info = new Buffer(req.headers.info, 'base64').toString();
    //var main_user_id = info.split('|')[0];
    //var sub_user_id = info.split('|')[1];
    var main_user_id = '725690843';
    var sub_user_id = '712125231';
    var stmt_thridparty_signup = 'insert into `friend` set `main_user_id`= ?, `sub_user_id`= ?' ;
    
    connection.query(stmt_thridparty_signup, [main_user_id, sub_user_id], function (err, result) {
        res.json({status:"true"});  
    });
});

router.get('/getUserList', function(req, res) {
    var stmt_duplicated = 'select count(*) as count from user';
    connection.query(stmt_duplicated, function (err, result) {
        var num = result[0].count;
        if (err) {
          return done(err);
        } else {
            var stmt_duplicated = 'select * from user';
            connection.query(stmt_duplicated, function (err, result) {
                if (err) {
                  return done(err);
                } else {
                  res.json({user_num:num, rows:result});
                }
            });
        }
    });
});

module.exports = router;