var express = require('express');
var router = express.Router();
const cors = require('cors');
const multer = require('multer');
var fs = require('fs');
var mysql_dbc = require('../commons/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

var countList = 10; //한 페이지에 보여줄 게시글의 개수는 10.

const upload = multer({
  limits: { fileSize: 10 * 2048 * 2048 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/images/'); // avatars 폴더에 파일을 저장한다.
    },
    filename(req, file, cb) {
      cb(null, file.originalname); // 전송된 파일 자신의 이름으로 파일을 저장한다.
    }
  })
});

/* GET List Page. */
router.get('/getLikeArr/:board_idx', function (req, res, next) {
  var board_idx = req.params.board_idx;
  var stmt_duplicated = 'select b.nickname, b.image_address ' +
  ' from like_table a inner join user b on (b.user_id = a.user_id) where `board_idx` = ?'

  connection.query(stmt_duplicated, board_idx, function (err, rows) {
    res.json({ rows: rows });
  })
});

router.get('/:user_id/:page', function (req, res, next) { //접속은 localhost:3000/newfeed/현재페이지 번호로만 받으면 필수 정보는 앵귤러로 출력
  var getBoardNumQuery = 'select count(*) as count from board';
  connection.query(getBoardNumQuery, function (err, result) {
    var user_id = req.params.user_id;
    var page = req.params.page; //띄워줄 페이지의 번호
    var totalCount = result[0].count; //전체 게시글의 수
    var totalPage = totalCount / countList; //전체 페이지의 수는 전체 게시글 수/한페이지에 보여줄 게시글 수
    totalPage = parseInt(totalPage); //정수형으로 변경

    if (totalCount % countList > 0) {
      totalPage++;
    } //만약 위에서 계산한 토탈페이지에서 나머지가 있으면 반드시 총 페이지 + 1 해줌.

    if (totalPage < page) { //만약 쿼리스트링으로 접근한 페이지가 전체 페이지보다 크면
      page = totalPage;   //접근한 쿼리스트링의 페이지는 전체페이지로 치환.
    }

    var startPage = parseInt((page - 1) / 20) * 20 + 1; //앵귤러에 띄워줄 시작 페이지 번호(현재 페이지 기준으로)
    var endPage = startPage + 19; //앵귤러에 띄워줄 마지막 페이지 번호(현재 페이지 기준으로)

    if (endPage > totalPage) {
      endPage = totalPage;
    } //마지막페이지는 항상 10단위로 끝나게 되어있는것을 보정해줌


    var stmt_duplicated = 'select a.idx,a.user_id,a.nickname,a.content,a.like_num,a.image_path,count(comment.board_idx) as comment_count,' + 
      'CASE WHEN like_table.board_idx IS NULL THEN \'False\' ELSE \'True\' END AS check_like,' + 
      'DATE_FORMAT(a.moddate, "%Y/%m/%d %T") as moddate,' + 
      'DATE_FORMAT(a.regdate, "%Y/%m/%d %T") as regdate,' + 
      'b.image_address from board a inner join user b on (a.user_id = b.user_id) ' + 
      'left join comment on (a.idx = comment.board_idx) ' + 
      'left join like_table on (a.idx = like_table.board_idx and like_table.user_id = ?) ' + 
      'group by a.idx order by idx desc LIMIT ?,?';

    if (page == 1 && page == endPage) {
      connection.query(stmt_duplicated, [user_id, parseInt(page) - 1, totalCount], function (err, rows) {
        if (err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.

        res.json({ status: true, totalCount: totalCount, page: page, startPage: startPage, endPage: endPage, totalPage: totalPage, rows: rows });
      });
    } else if (page == 1 && page != endPage) {
      connection.query(stmt_duplicated, [user_id, parseInt(page) - 1, 10], function (err, rows) {
        if (err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.

        res.json({ status: true, totalCount: totalCount, page: page, startPage: startPage, endPage: endPage, totalPage: totalPage, rows: rows });
      });
    } else if (page > 1 && page != endPage) {
      connection.query(stmt_duplicated, [user_id, (parseInt(page) - 1) * 10, 10], function (err, rows) {
        if (err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.

        res.json({ status: true, totalCount: totalCount, page: page, startPage: startPage, endPage: endPage, totalPage: totalPage, rows: rows });
      });
    } else if (page > 1 && page == endPage) {
      connection.query(stmt_duplicated, [user_id, (parseInt(page) - 1) * 10, totalCount - ((parseInt(page) - 1) * 10)], function (err, rows) {
        if (err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.

        res.json({ status: true, totalCount: totalCount, page: page, startPage: startPage, endPage: endPage, totalPage: totalPage, rows: rows });
      });
    }
  });
});

//자기 글만 떼줄 글 목록
router.get('/specificPage/:my_user_id/:select_user_id/:page', function (req, res, next) { //접속은 localhost:3000/newfeed/현재페이지 번호로만 받으면 필수 정보는 앵귤러로 출력
  var getBoardNumQuery = 'select count(*) as count from board where user_id = ?'
  var my_user_id = req.params.my_user_id;
  var select_user_id = req.params.select_user_id;
  var page = req.params.page; //띄워줄 페이지의 번호
 
  connection.query(getBoardNumQuery,[req.params.select_user_id],function (err, result) {
    var totalCount = result[0].count; //전체 게시글의 수
    var totalPage = totalCount / countList; //전체 페이지의 수는 전체 게시글 수/한페이지에 보여줄 게시글 수
    totalPage = parseInt(totalPage); //정수형으로 변경

    if (totalCount % countList > 0) {
      totalPage++;
    } //만약 위에서 계산한 토탈페이지에서 나머지가 있으면 반드시 총 페이지 + 1 해줌.

    if (totalPage < page) { //만약 쿼리스트링으로 접근한 페이지가 전체 페이지보다 크면
      page = totalPage;   //접근한 쿼리스트링의 페이지는 전체페이지로 치환.
    }

    var startPage = parseInt((page - 1) / 20) * 20 + 1; //앵귤러에 띄워줄 시작 페이지 번호(현재 페이지 기준으로)
    var endPage = startPage + 19; //앵귤러에 띄워줄 마지막 페이지 번호(현재 페이지 기준으로)

    if (endPage > totalPage) {
      endPage = totalPage;
    } //마지막페이지는 항상 10단위로 끝나게 되어있는것을 보정해줌


    var stmt_duplicated = 'select a.idx,a.user_id,a.nickname,a.content,a.like_num,a.image_path,count(comment.board_idx) as comment_count,' +
    ' CASE WHEN like_table.board_idx IS NULL THEN \'False\' ELSE \'True\' END AS check_like' + 
    ' ,DATE_FORMAT(a.moddate, "%Y/%m/%d %T") as moddate' +
    ' ,DATE_FORMAT(a.regdate, "%Y/%m/%d %T") as regdate' +
    ' ,b.image_address from board a ' + 
    ' inner join user b on (b.user_id = a.user_id) '+
    ' left join comment on (comment.board_idx = a.idx)' + 
    ' left join like_table on (a.idx = like_table.board_idx and like_table.user_id = ?) '+
    ' where a.user_id = ?'+
    ' group by a.idx order by idx desc LIMIT ?,?';

    if (page == 1 && page == endPage) {
      connection.query(stmt_duplicated, [my_user_id, select_user_id, parseInt(page) - 1, totalCount], function (err, rows) {
        if (err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.

        res.json({ status: true, totalCount: totalCount, page: page, startPage: startPage, endPage: endPage, totalPage: totalPage, rows: rows});
      });
    } else if (page == 1 && page != endPage) {
      connection.query(stmt_duplicated, [my_user_id, select_user_id, parseInt(page) - 1, 10], function (err, rows) {
        if (err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.

        res.json({ status: true, totalCount: totalCount, page: page, startPage: startPage, endPage: endPage, totalPage: totalPage, rows: rows});
      });
    } else if (page > 1 && page != endPage) {
      connection.query(stmt_duplicated, [my_user_id, select_user_id, (parseInt(page) - 1) * 10, 10], function (err, rows) {
        if (err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.

        res.json({ status: true, totalCount: totalCount, page: page, startPage: startPage, endPage: endPage, totalPage: totalPage, rows: rows});
      });
    } else if (page > 1 && page == endPage) {
      connection.query(stmt_duplicated, [my_user_id, select_user_id, (parseInt(page) - 1) * 10, totalCount - ((parseInt(page) - 1) * 10)], function (err, rows) {
        if (err) console.log(err);        // 만약 에러값이 존재한다면 로그에 표시합니다.

        res.json({ status: true, totalCount: totalCount, page: page, startPage: startPage, endPage: endPage, totalPage: totalPage, rows: rows});
      });
    }
  });
});

// POST 방식의 요청이 들어왔을 때 데이터를 DB에 저장하고 해당하는 DB의 IDX값을
// 가지고 온 후 Read 페이지로 이동합니다.
router.post('/writePost', function (req, res, next) {
  var decoded = new Buffer(req.headers.authorization.split('Beare ')[1], 'base64').toString();
  var user_id = decoded.split('|')[0];
  var user_name = decoded.split('|')[1];
  var post = decoded.split('|')[2];

  var stmt_thridparty_signup = 'insert into `board` set `user_id`= ?, `nickname`= ?, `content`= ?';
  connection.query(stmt_thridparty_signup, [user_id, user_name, post], function (err, result) {
    res.json({ status: true });
  });
});

router.post('/deletePost', function (req, res, next) {
  var board_idx = req.body.board_idx;
  console.log(board_idx);
  var stmt_thridparty_signup = 'delete from `board` where `idx`= ?';
  connection.query(stmt_thridparty_signup, [board_idx], function (err, result) {
    res.json({ status: true });
  });
});


router.post('/writePostIncludeImage',upload.single('image'),function (req, res, next) {
  //console.log(req.headers.authorization);
  res.json({filename:req.file.filename});
}); //서버에 이미지 파일 저장 후 저장한 이미지 이름 전달

router.post('/writePostIncludeFilename', function (req, res, next) {
  var date = new Date();
  var year = date.getFullYear();    //yyyy
	var month = (1 + date.getMonth());   //M
	month = month >= 10 ? month : '0' + month;  // month 두자리로 저장
	var day = date.getDate();          //d
  day = day >= 10 ? day : '0' + day; //day 두자리로 저장

  var decoded = new Buffer(req.headers.authorization.split('Beare ')[1], 'base64').toString();
  var user_id = decoded.split('|')[0];
  var user_name = decoded.split('|')[1];
  var post = decoded.split('|')[2];
  var filename = decoded.split('|')[3];

  var new_file_name = year+month+day+"_"+filename;

  fs.renameSync("../server/public/images/" + filename, "../server/public/images/" + new_file_name); //파일 이름의 고유화를 위해 이름 앞에 날짜 붙여서 다시 만듬

  var stmt_thridparty_signup = 'insert into `board` set `user_id`= ?, `nickname`= ?, `content`= ?, `image_path`= ?';
  connection.query(stmt_thridparty_signup, [user_id, user_name, post,new_file_name], function (err, result) {
    res.json({ status: true });
  });
});

router.post('/writeComment', function (req, res, next) {
  /*
  *POST 방식의 요청을 URL에 데이터가 포함되지 않고 BODY에 포함되어 전송됩니다.
  * 때문에 request 객체를 통해 body에 접근 후 데이터를 가지고 옵니다.
   *  */
  var decoded = new Buffer(req.headers.authorization.split('Beare ')[1], 'base64').toString();
  var user_id = decoded.split('|')[0];
  var user_name = decoded.split('|')[1];
  var board_idx = decoded.split('|')[2];
  var post = decoded.split('|')[3];
  console.log(user_id, user_name, board_idx, post);
  // 신규 유저는 회원 가입 이후 로그인 처리
  var stmt_thridparty_signup = 'insert into `comment` set `board_idx`= ?, `user_id`= ?, `nickname`= ?, `content`= ?';
  connection.query(stmt_thridparty_signup, [board_idx, user_id, user_name, post], function (err, result) {
    res.json({ status: true });
  });
});

router.get('/loadComment/:user_id/:board_idx', function (req, res, next) {
  var user_id = req.params.user_id;
  var board_idx = req.params.board_idx;

  var stmt_duplicated = 'select c.comment_idx, c.board_idx, c.user_id, c.nickname, c.content, u.image_address from comment c inner join user u on (c.user_id = u.user_id) where `board_idx`= ?';

  connection.query(stmt_duplicated, board_idx, function (err, rows) {
    res.json({ rows: rows });
  });
});

router.get('/clickLike/:user_id/:board_idx', function (req, res, next) {
  var user_id = req.params.user_id;
  var board_idx = req.params.board_idx;

  var stmt_duplicated = 'select * from like_table where `board_idx` = ? and `user_id` = ?'
  connection.query(stmt_duplicated, [board_idx, user_id], function (err, result) {
    if (result[0] == undefined) { //댓글을 좋아요하지 않은 상태에서 좋아요 버튼을 누르면 좋아요 입력
      var stmt_thridparty_signup = 'insert into `like_table` set `board_idx`= ?, `user_id`= ?';
      connection.query(stmt_thridparty_signup, [board_idx, user_id], function (err, result) {
        var stmt_update_like_num = 'update `board` set like_num = like_num + 1 where `idx`= ?';
        connection.query(stmt_update_like_num, [board_idx], function (err, result) {
          res.json({ status: true });
        });
      });
    } else { //댓글을 좋아요한 상태에서 좋아요 버튼을 누르면 좋아요 취소
      var stmt_thridparty_signup = 'delete from like_table where `board_idx` = ? and `user_id` = ?'
      connection.query(stmt_thridparty_signup, [board_idx, user_id], function (err, result) {
        var stmt_update_like_num = 'update `board` set like_num = like_num - 1 where `idx`= ?';
        connection.query(stmt_update_like_num, [board_idx], function (err, result) {
          res.json({ status: true });
        });
      });
    }
  });
});

module.exports = router;