const express = require('express')
const app = express()
const port = 3000
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser');
const mysql = require('mysql2');
var currentUser;
var currentTitle;
var list = [];
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'pest',
  password: 'pestpass',
  database: 'App'
});

app.use(express.static('static')) // static  files

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

var session = require('express-session');
var sessionOptions = {
  // session's secret (make sure to type a different string of random characters here)
  secret: '0f9sdui09fusd0uau40ru4ekc;klsdkz;lzs[2oe340#d]',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
};

// the code below allows you to get secure cookies in production
// but non-secure cookies in development
// secure cookies would crush your app in development, hence
// we use a conditional here
if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sessionOptions.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionOptions));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/register', (req, res) => {
  res.render('register.html');
});
app.get('/main', (req, res) => {
  var title = currentTitle;
  var user = currentUser;
  console.log('list at the begining', list, title, user);
  res.render('main.html', {

    list: list, 
    user: user,
    title: title,

  });
});


app.get('/', (req, res) => {
  res.render('login.html');
});
app.post('/form_data', (req, res) => {
  //console.log(req.body.gender)
  // req.body is where all the data sent from the browser live
  if (req.body.source === "register") {
    var userNameMysqlCheck = "SELECT `UserName` FROM `Users` WHERE `UserName` = '" + req.body.username + "';";
    connection.query(userNameMysqlCheck, function(err, results, fields) {
      console.log('table', results);
      if (results.length === 0) {
        list=[];
        currentTitle = req.body.title;
        currentUser = req.body.username;
        console.log(currentTitle, currentUser);
        console.log('Good for registration');
        res.json('User does not exists');
      } else {
        res.json('User already exists');
      }
    });
  }
  if (req.body.source === "login") {
    var userMysqlCheck = "SELECT `UserTitle`,`UserName`,`UserPass` FROM `Users` WHERE `UserName` = '" + req.body.username + "' AND `UserPass` = '" + req.body.password + "';";
    connection.query(userMysqlCheck, function(err, results, fields) {
      console.log('table', results);
      if (results.length === 0) {
        console.log('Bad User/Password Set');
        res.json('Bad User/Password Set');
      } else {
        currentTitle = results[0].UserTitle;
        currentUser = req.body.username;
        console.log(currentTitle, currentUser);
        res.json('Good for login');
      }
    });
    var listCheck = "SELECT `Task` FROM `LongList` WHERE `UserName` = '" + req.body.username + "';";
    connection.query(listCheck, function(err, results, fields) {
      console.log('List raw', results);
      for (var i = 0; i < results.length; i++) {
        list[i] = {
          id: i+1,
          title: results[i].Task
        }
      }
      console.log('List cleaned', list);
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
