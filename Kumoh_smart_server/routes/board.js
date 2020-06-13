var express = require('express');
var router = express.Router();

var mysql_dbc = require('../commons/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

/* GET List Page. */
router.get('/', function (req, res, next) {
  res.redirect('/board/list/1');// /board로 접속요청이 들어왔을 때 1페이지로 자동으로 이동하도록 리다이렉트 해줍니다.
});

router.get('/list', function (req, res, next) {
  res.redirect('/board/list/1');// /board로 접속요청이 들어왔을 때 1페이지로 자동으로 이동하도록 리다이렉트 해줍니다.
});

router.get('/list/:page', function (req, res, next) {

  /* GET 방식의 연결이므로 read 페이지 조회에 필요한 idx 값이 url 주소에 포함되어 전송됩니다.
   이 idx값을 참조하여 DB에서 해당하는 정보를 가지고 옵니다.
  * url에서 idx 값을 가져오기 위해 request 객체의 params 객체를 통해 idx값을 가지고 옵니다.*/
  //var idx = req.params.idx;
  //console.log("idx : "+idx);
  /*
  * Node는 JSP에서 JDBC의 sql문 PreparedStatement 처리에서와 같이 sql문을 작성할 때
  * ? 를 활용한 편리한 쿼리문 작성을 지원합니다.
  * Node에서 참조해야할 인자값이 있을 때 ? 로 처리하고
  * []를 통해 리스트 객체를 만든 후 ? 의 순서대로 입력해주시면 자동으로 쿼리문에 삽입됩니다.
  * 아래에는 ?에 idx값이 자동으로 매핑되어 쿼리문을 실행합니다.
  * */
  /**/

  connection.beginTransaction(function (err) {

    var all_board_num = 'select count(*) as count from board';
    connection.query(all_board_num, function (err, result) {
      var num = result[0].count; //무한 스크롤을 위해 전체 타임라인의 개수를 가져

      connection.query('select idx,title,content,nickname,DATE_FORMAT(moddate, "%Y/%m/%d %T")' +
        ' as moddate,DATE_FORMAT(regdate, "%Y/%m/%d %T") as regdate from board order by idx desc', function (err, rows) {
          if (err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.

          res.render('list', { number: num, title: '타임라인', write: 'write', read: 'Timeline', rows: rows });
        });
    });
  });
});

router.get('/list/:comment', function (req, res, next) {

  connection.beginTransaction(function (err) {

    var all_comment_num = 'select count(*) as count from comment';
    connection.query(all_comment_num, function (err, result) {
      var num = result[0].count; //무한 스크롤을 위해 전체 타임라인의 개수를 가져

      connection.query('select num,content(moddate, "%m")' +
        ' as moddate,DATE_FORMAT(regdate, "%m") as regdate from comment order by idx desc', function (err, row) {
          if (err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.

          res.render('list', { number: num, title: '타임라인', write: 'write', read: 'Timeline', rows: rows });
        });
    });
  });
});


// POST 방식의 요청이 들어왔을 때 데이터를 DB에 저장하고 해당하는 DB의 IDX값을
// 가지고 온 후 Read 페이지로 이동합니다.
router.post('/write', function (req, res, next) {
  /*
  *POST 방식의 요청을 URL에 데이터가 포함되지 않고 BODY에 포함되어 전송됩니다.
  * 때문에 request 객체를 통해 body에 접근 후 데이터를 가지고 옵니다.
   *  */
  var body = req.body;
  var nickname = body.nickname;
  var title = req.body.title;
  var content = req.body.content;
  var user_id = req.body.user_id;

  var stmt_duplicated = 'select MAX(idx) as idx FROM `board`';
  connection.query(stmt_duplicated, function (err, result) {
    // 신규 유저는 회원 가입 이후 로그인 처리
    var stmt_thridparty_signup =
      `insert into board set title = ${title}, nickname = ${nickname}, content = ${content}, user_id = ${user_id}`;
    connection.query(stmt_thridparty_signup, function (err, result) {
      console.log(err);
      console.log('New board : ' + title + ' Write!');
    });
  });

  res.redirect('/board/list');
});

router.post('/writeComment', function (req, res, next) {
  /*
  *POST 방식의 요청을 URL에 데이터가 포함되지 않고 BODY에 포함되어 전송됩니다.
  * 때문에 request 객체를 통해 body에 접근 후 데이터를 가지고 옵니다.
   *  */
  var body = req.body;
  var board_idx = req.body.board_idx;
  var content = req.body.content;
  // 신규 유저는 회원 가입 이후 로그인 처리
  var stmt_thridparty_signup = `insert into comment set boarder_idx = ${board_idx}, content= ${content}`;
  connection.query(stmt_thridparty_signup, function (err, result) {
    console.log(err);
    console.log('New board : ' + board_idx + ' Write!');
  });
  res.redirect('/board/list');
});

module.exports = router;
