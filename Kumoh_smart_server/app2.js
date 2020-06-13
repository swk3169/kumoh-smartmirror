
var express = require('express');

var app = express();


app.get('*', function(req, res) {
  console.log('sdf');
  res.send('hello world');
});



/*
app.listen(port, function(){
  console.log('The server is running, ' +
    ' please, open your browser at http://localhost:%s',
    port);
});
*/
module.exports = app;