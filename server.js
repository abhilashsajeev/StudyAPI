var express = require('express'),
	path = require('path'),
	app = express(),
	compression = require('compression'),
	jsonfile = require('jsonfile');
	require("node-jsx").install();

var shoppingData = __dirname +"/shoppingData.json";
var jobData = __dirname +"/jobData.json";
var request = require('superagent');
	var port = 3000,
	bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static(path.join(__dirname, 'dist')));
app.set('env', 'production');
app.use(compression());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Cache-Control", "public, max-age=34560"); 
  res.setHeader("Expires", new Date(Date.now() + 34560).toUTCString());
  next();
});


app.get('/api/get_shop_data', function (req, res) {
  
  jsonfile.readFile(shoppingData, function(err, obj) {
  	res.status(200).jsonp(obj);
  })

});
app.get('/api/get_job_data', function (req, res) {
  
  jsonfile.readFile(jobData, function(err, obj) {
  	res.status(200).jsonp(obj);
  })

});
app.post('/api/set_stock_data', function (req, res) {
  
	console.log(req.body);
	if(req.body.name ===""||req.body.name ===null||req.body.name === undefined){
		res.send("501");
	}else{
		jsonfile.readFile(file_jiyo, function(err, obj) {
	  		if(req.body.id in obj.results){
	  			obj.results[req.body.id].name = req.body.name;
	  		}else{
	  			var new_obj = {"id":obj.results.length,"name":req.body.name};		
		  		obj.results.push(new_obj);
	  		}
	  		jsonfile.writeFileSync(file_jiyo, obj, {spaces: 4});
	  		res.send("200")	;
  		})
	}
	
});

app.post('/api/priya/set_person_data', function (req, res) {
  
	console.log(req.body);
	if(req.body.name ===""||req.body.name ===null||req.body.name === undefined){
		res.send("501");
	}else{
		jsonfile.readFile(file_priya, function(err, obj) {
	  		if(req.body.id in obj.results){
	  			obj.results[req.body.id].name = req.body.name;
	  		}else{
	  			var new_obj = {"id":obj.results.length,"name":req.body.name};		
		  		obj.results.push(new_obj);
	  		}
	  		jsonfile.writeFileSync(file_priya, obj, {spaces: 4});
	  		res.send("200")	;
  		})
	}
	
});


app.listen(port);

console.log('Server is Up and Running at Port : ' + port);