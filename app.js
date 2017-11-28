var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient=require('mongodb').MongoClient,
    DB_CONN_STR='mongodb://zcd:123456@localhost:27017/mysite';//数据库为mysite
//添加数据
var insertData=function(db,callback){
    //连接到picts表
    var collection=db.collection('picts');
    //插入数据
    var data=[{'pictName':'img2','pict':'company-img-6.jpg'}];
    collection.insert(data,function(err,result){
        if(err){
            console.log('Error:'+err);
            return;
        }
        callback(result);
    });
};
//查询数据
const selectData=function(db,callback){
    //连接到picts表
    let collection=db.collection('picts');
    //查询数据
    let whereStr={'pictName':'img1'};

    collection.find(whereStr).toArray(function (err,result) {
        if(err){
            console.log('Error:'+err);
            return;
        }
        callback(result);
    });
};

MongoClient.connect(DB_CONN_STR,function(err,db){
  console.log('连接成功！');
  selectData(db,function(result){
    console.log(result);
    db.close();
  });
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
