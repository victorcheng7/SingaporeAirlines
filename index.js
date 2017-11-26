var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var datetime = require('node-datetime');
var fs = require('fs');

var app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//TODO Send data to Dynamodb
var dt = datetime.create();
app.post("/", (req, res) => {
		res.header("Access-Control-Allow-Origin", "chrome-extension://*");
		res.header('Access-Control-Allow-Credentials', 'false');
		res.header('Access-Control-Allow-Methods', 'POST');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
		var result = req.body;

    fs.writeFile("./output.txt", JSON.stringify(result), function(err){
      if(err) return console.log(err);
      console.log("Filed saved!");
    });
    console.log(result);
});

app.listen(process.env.PORT || 5000, () => console.log("Server started"));
