var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (request, response) {
  let page = 1
  let db = []
  for(let i=0; i<30; i++){
    db.push({
      title: `标题${i+1}`,
      content: `正文${i+1}, 文字很多，随便表示一下`
    })
  }
  let data = {
    articles: db.slice(10*(page-1), 10*page),
    totalPages: Math.ceil(db.length / 10),
    currentPage: page
  }
  response.render('home', data);
});
app.get('/paged', function (request, response) {
  let page = parseInt(request.query.page || 1)
  let db = []
  for(let i=0; i<30; i++){
    db.push({
      title: `标题${i+1}`,
      content: `正文${i+1}, 文字很多，随便表示一下`
    })
  }
  let data = {
    articles: db.slice(10*(page-1), 10*page),
    totalPages: Math.ceil(db.length / 10),
    currentPage: page
  }
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(data));
});

  app.listen(3000);
  console.log('server started!')
