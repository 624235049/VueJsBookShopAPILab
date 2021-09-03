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

//Get all books
app.get(apiversion + '/books',  function (req, res)  {  

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.query('SELECT * FROM books', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'books list', data: results });
  });

  
});

//Get student by id
app.get(apiversion + '/student/:studentId',  function (req, res)  {  


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var studentId = Number(req.params.studentId);
  
  db.query('SELECT * FROM student where studentId=?', studentId.toString(),function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'student Id =' + studentId.toString(), data: results });
  });


});



//Delete book by id
app.delete(apiversion + '/book/:bookid',  function (req, res)  {  

  var bookid=req.params.bookid;
  
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  

    db.query(`DELETE from books WHERE bookid =${bookid};`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: ' Modified book' });
  });

});


//Add new book
app.post(apiversion + '/book',  function (req, res)  {  


  var title = req.body.title; 	
  var price=req.body.price;
	var isbn = req.body.isbn;
	var pageCount = req.body.pageCount;
	var publishedDate=req.body.publishedDate;
	var thumbnailUrl=req.body.thumbnailUrl;
  var shortDescription=req.body.shortDescription;
  var author=req.body.author;
  var category=req.body.category;


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var bookid = Number(req.params.bookid);
  
  db.query(`INSERT INTO books 
    (title,price, isbn, pageCount, publishedDate, thumbnailUrl, 
    shortDescription, author, category) 
    VALUES ( '${title}',${price}, '${isbn}', ${pageCount}, '${publishedDate}', '${thumbnailUrl}', 
    '${shortDescription}', '${author}', '${category}');`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'Insert new book' });
  });




  

  });

  app.put(apiversion + '/book/:bookid',  function (req, res) {

  var title = req.body.title; 	
  var price=req.body.price;
	var isbn = req.body.isbn;
	var pageCount = req.body.pageCount;
	var publishedDate=req.body.publishedDate;
	var thumbnailUrl=req.body.thumbnailUrl;
  var shortDescription=req.body.shortDescription;
  var author=req.body.author;
  var category=req.body.category;

  var bookid=req.params.bookid;
  
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  

    db.query(`UPDATE books 
            SET 
              title ="${title}", 
              isbn = "${isbn}", 
              pageCount = ${pageCount}, 
              publishedDate = "${publishedDate}", 
              thumbnailUrl = "${thumbnailUrl}", 
              shortDescription = "${shortDescription}", 
              author = "${author}", 
              category = "${category}",
              price = ${price}
            WHERE bookid =${bookid};`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: ' Modified book' });
  });

      
    });

  
  


  


//Edit book by id



app.listen(port, function () {
    console.log("Server is up and running...");
});
