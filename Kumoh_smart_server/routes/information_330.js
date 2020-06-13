var express = require('express');
var router = express.Router();

var axios = require('axios');
var moment = require('moment');

router.get('/', function(req, res, next) {
  var json_data;
  var a1 = [];
  var a2 = [];
  var a3 = [];
  var a4 = [];
  var b1 = [];
  var b2 = [];
  
  var status = [ true, true, true, true, true, true];
  //true면 예약 가능, false면 예약 불가능
 
  axios.get('http://202.31.202.156:3000/booking-info?date_flag=today')
  .then(function (response) {
      json_data = response.data;

      for(var i = 0; i < json_data.result.length; i++) {
        if(json_data.result[i].section == 'A1') {
          a1.push(...((json_data.result[i].booking_time).split(', ')));
        } else if(json_data.result[i].section == 'A2') {
          a2.push(...((json_data.result[i].booking_time).split(', ')));
        } else if(json_data.result[i].section == 'A3') {
          a3.push(...((json_data.result[i].booking_time).split(', ')));
        } else if(json_data.result[i].section == 'A4') {
          a4.push(...((json_data.result[i].booking_time).split(', ')));
        } else if(json_data.result[i].section == 'B1') {
          b1.push(...((json_data.result[i].booking_time).split(', ')));
        } else if(json_data.result[i].section == 'B2') {
          b2.push(...((json_data.result[i].booking_time).split(', ')));
        }
      }

      var hour = moment().hours();

      for(var a1_idx = 0; a1_idx < a1.length; a1_idx++) {
        if(a1[a1_idx] == hour) {
            status[0] = false;
        }
      }

      for(var a2_idx = 0; a2_idx < a2.length; a2_idx++) {
        if(a2[a2_idx] == hour) {
            status[1] = false;
        }
      }

      for(var a3_idx = 0; a3_idx < a3.length; a3_idx++) {
        if(a3[a3_idx] == hour) {
            status[2] = false;
        }
      }

      for(var a4_idx = 0; a4_idx < a4.length; a4_idx++) {
        if(a4[a4_idx] == hour) {
            status[3] = false;
        }
      }

      for(var b1_idx = 0; b1_idx < b1.length; b1_idx++) {
        if(b1[b1_idx] == hour) {
            status[4] = false;
        }
      }

      for(var b2_idx = 0; b2_idx < b2.length; b2_idx++) {
        if(b2[b2_idx] == hour) {
            status[5] = false;
        }
      }

      res.json({
        a1:status[0],
        a2:status[1],
        a3:status[2],
        a4:status[3],
        b1:status[4],
        b2:status[5]
      }); //false는 예약 불가능, true는 예약 가능.
  })
  .catch(function (error) {
      json_data = "no data";
      res.json({
        a1:error,
        a2:error,
        a3:error,
        a4:error,
        b1:error,
        b2:error
      });
  });
});

module.exports = router;