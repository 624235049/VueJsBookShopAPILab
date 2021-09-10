var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var apiversion='/api/v1';


//MYSQL Connection
var db = require('./config/db.config');


var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get(apiversion + '/area',  function (req, res)  {  

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.query('SELECT * FROM area', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'area list', data: results });
  });

  
});

//Get area by id
app.get(apiversion + '/area/:areaId',  function (req, res)  {  


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var areaId = Number(req.params.areaId);
  
  db.query('SELECT * FROM area where areaId=?', areaId.toString(),function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'areaId =' + areaId.toString(), data: results });
  });


});



//Add new post
app.post(apiversion + '/area',  function (req, res) {

  var areaId = Number(req.body.areaId);
  var areaName = req.body.areaName;
  var areaPosition = req.body.areaPosition;
  var areaSize = Number(req.body.areaSize);
  var areaPicture = req.body.areaPicture;

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  db.query(`INSERT INTO area (areaId,areaName,areaPosition,areaSize,areaPicture) VALUES (${areaId},'${areaName}','${areaPosition}',${areaSize},'${areaPicture}');`,function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: 'Insert new area' });
  });


});



app.listen(port, function () {
    console.log("Server is up and running...");
});








