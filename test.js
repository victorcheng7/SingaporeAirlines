var fs = require('fs');

fs.readFile('./output.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var a = JSON.parse(data);
  console.log(a.length);
});
