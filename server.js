var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    
'article-one':{
    title:'Article one | Arshia',
    heading:'Article One',
    date:'12 Aug 2017',
    content:`
    <p>This is article one content..This is article one content..This is article one content..</p>
            <p>This is article one content..This is article one content..This is article one content..</p>
            <p>This is article one content..This is article one content..This is article one content..</p>
    `
},
'article-two':{
     title:'Article two | Arshia',
    heading:'Article Two',
    date:'13 Aug 2017',
    content:`
    <p>This is article two content..This is article two content..This is article two content..</p>
    `
},
'article-three':{
     title:'Article Three | Arshia',
    heading:'Article Three',
    date:'14 Aug 2017',
    content:`
    <p>This is article three content..This is article three content..This is article three content..</p>
    `
}

};

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
var htmlTemplate=`
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width-device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>${heading}</h3>
        <div>${date}</div>
        <div>
            ${content}
        </div> 
        </div>
        </body>
</html>
`;

return htmlTemplate;
}

var counter=0;
app.get('/counter',function(req, res){
    counter=counter+1;
    res.send(counter.toString());
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/:articleName',function(req, res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

var names=[];
app.get('/submit-name/:name',function(req, res){// /submit-name?name=xxxx
    var name=req.query.name;
    names.push(name);
    //JSON javascript object notation
    res.send(JSON.stringify(names));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
