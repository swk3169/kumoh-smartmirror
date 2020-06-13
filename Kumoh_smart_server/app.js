var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var flash = require('connect-flash'); // session 관련해서 사용됨. 로그인 실패시 session등 클리어하는 기능으로 보임.

var passport = require('passport'); //passport module add
var LocalStrategy = require('passport-local').Strategy;

var cafeteria = require('./routes/cafeteria');
var board = require('./routes/board');
var member_information = require('./routes/member_information');
var information_330 = require('./routes/information_330');
var newsfeed = require('./routes/newsfeed');
var loginProcess = require('./routes/loginProcess');
var friend = require('./routes/friend');
var app = express();

var expressLayouts = require('express-ejs-layouts');

// 'EJS' view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname,'image')));
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('public/images'));
app.use(express.static(path.join(__dirname, 'node_modules'))); // 노드모듈 디렉토토리 추가
app.use( function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  next();
});

app.use(cookieSession({
  keys: ['taewon'],
  cookie: {
    maxAge: 100 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/cafeteria', cafeteria);           //식당 메뉴 조회
app.use('/information_330', information_330);   //330 예약 현황 조회
app.use('/board', board);                   //게시판
app.use('/member_information', member_information);
app.use('/newsfeed', newsfeed);
app.use('/loginProcess', loginProcess);
app.use('/friend', friend);

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/



exports.logout = function (req, res) {
  req.session.destory();  // 세션 삭제
  res.clearCookie('taewon'); // 세션 쿠키 삭제
};

console.log("Server :: Kumoh Smart Server is Open");

module.exports = app;
