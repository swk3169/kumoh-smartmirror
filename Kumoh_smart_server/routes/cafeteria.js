var express = require('express');
var router = express.Router();

var async = require('async');
var cheerio = require('cheerio');
var request = require('request');

var student_Meal_url = 'https://www.kumoh.ac.kr/jsp/common/sikdang.do';
var professor_Meal_url = 'https://www.kumoh.ac.kr/jsp/common/sikdang2.do';
var dorm_Meal_url = 'https://dorm.kumoh.ac.kr/facility/dorm/sikdang.do?ilja=';

var professor_meal = [];
var student_meal = [];
var dorm_meal = [];
var date = new Date();

function getFormatDate() { //기숙사 식당은 날짜를 꼭 써놓아야 사이트 열람 가능.
  var year = date.getFullYear();    //yyyy
	var month = (1 + date.getMonth());   //M
	month = month >= 10 ? month : '0' + month;  // month 두자리로 저장
	var day = date.getDate();          //d
  day = day >= 10 ? day : '0' + day; //day 두자리로 저장
  return year + '' + month + '' + day;
}

var requestStudentMeal = function() { //학생 식당 파싱
  request(student_Meal_url, function(error, response, body){
    var $ = cheerio.load(body);

    for(var i = 0; i < 7; i++) {
      $('.meal01 > dl > dd').each(function(){
        var title_info = $(this);
        student_meal[i] = title_info.text();
        i++;
      });
    }
  });
};

var requestProfessorMeal = function() { //교직원 식당 파싱
  request(professor_Meal_url, function(error, response, body){
    var $ = cheerio.load(body);

    for(var i = 0; i < 7; i++) {
      $('.meal01 > dl > dd').each(function(){
        var title_info = $(this);
        professor_meal[i] = title_info.text();
        i++;
      });
    }
  });
};

var requestDormMeal = function() { //기숙사 식당 파싱
  dorm_Meal_url = dorm_Meal_url + "" + getFormatDate();
  request(dorm_Meal_url, function(error, response, body){
    var $ = cheerio.load(body);
    
    for(var i = 0; i < 2; i++) {
      $('.meal01 > dl > dd').each(function(){
        var title_info = $(this);
        dorm_meal[i] = title_info.text();
        i++;
      });
    }

    for(var i = 2; i < 4; i++) {
      $('.meal02 > dl > dd').each(function(){
        var title_info = $(this);
        dorm_meal[i] = title_info.text();
        i++;
      });
    }

    for(var i = 4; i < 6; i++) {
      $('.meal03 > dl > dd').each(function(){
        var title_info = $(this);
        dorm_meal[i] = title_info.text();
        i++;
      });
    }
  });
  dorm_Meal_url = 'https://dorm.kumoh.ac.kr/facility/dorm/sikdang.do?ilja=';
};

router.get('/', function(req, res, next) {
  
  requestStudentMeal();
  requestProfessorMeal();
  requestDormMeal();
 
  res.json({
    date: date.getFullYear() + "년 " + (date.getMonth()+1) + " 월 " + date.getDate() + "일",

    student_meal_breakfast:student_meal[0],
    student_meal_lunch:student_meal[2],
    student_meal_dinner:student_meal[4],
    student_meal_special:student_meal[6],

    professor_meal_breakfast:professor_meal[0],
    professor_meal_lunch:professor_meal[1],
    professor_meal_dinner:professor_meal[2],

    fullomhm_dorm_mael_lunch:dorm_meal[0],
    fullomhm_dorm_mael_dinner:dorm_meal[1],
    oleum1_dorm_mael_breakfast:dorm_meal[2],
    oleum1_dorm_mael_dinner:dorm_meal[3],
    oleum3_dorm_mael_lunch:dorm_meal[4],
    oleum3_dorm_mael_dinner:dorm_meal[5],
  });
  console.log("Server :: load Meal Information");
});

module.exports = router;