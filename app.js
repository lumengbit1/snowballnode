let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');


let databaseRouter = require('./routes/database');
let uploadRouter = require('./routes/uploading');
let editRouter = require('./routes/edit');
let subdatabaseRouter = require('./routes/subdatabase')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    dbOptions = {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: 3306,
        database: 'product'
    };

app.use(myConnection(mysql, dbOptions, 'single'));

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');


    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/

    }
    else {
        next();

    }
});

app.use('/', databaseRouter);
app.use('/upload', uploadRouter);
app.use('/edit', editRouter);
app.use('/subtable', subdatabaseRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
