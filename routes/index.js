const express = require('express');
const router = express.Router();
const MongoClient=require('mongodb').MongoClient,
    DB_CONN_STR='mongodb://zcd:123456@localhost:27017/mysite';//数据库为mysite
//查询数据中间缩略图
const selectData=function(db,callback){
    //连接到picts表
    let collection=db.collection('picts');
    //查询数据
    collection.find().toArray(function (err,result) {
        if(err){
            console.log('Error:'+err);
            return;
        }
        callback(result);
    });
};
let str='';

//查询数据人物介绍
const selectPersonData=function(db,callback){
    //连接到person表
    let collection=db.collection('person');
    //查询数据
    collection.find().toArray(function (err,result) {
        if(err){
            console.log('Error:'+err);
            return;
        }
        callback(result);
    });
};
let per='';
MongoClient.connect(DB_CONN_STR,function(err,db){
    selectPersonData(db,function(result){
        result.forEach(function(elem,index){
            if(index>2){
                return;
            }
            per+="<div class='col-sm-6 col-md-4'>"+
                    "<div class='thumbnail thumbnail_person'>"+
                        "<img src='/images/"+elem.pict+"' alt='img1'>"+
                        "<div class='caption person'>"+
                        "<a class='person_name'>"+elem.name+"</a>"+
                    "<p class='person_intro'>"+elem.intro+"</p>"+
                   "</div>"+
                "</div>"+
                "</div>";
        });
        db.close();
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    let pict_num=req;
    console.log(pict_num)
    MongoClient.connect(DB_CONN_STR,function(err,db){
        console.log('连接成功！');
        selectData(db,function(result){
            if(!pict_num){
                num=1;
            }else{
                num=pict_num;
            }
            let leg=result.length;
            let output=parseInt(num*6);
            while(output>leg){
                num--;
                output=parseInt(num*6);
            }
            result.forEach(function(elem,index){

                if((index+1)<parseInt((num-1)*6)){
                    return;
                }
                if((index+1)>output){
                    return;
                }
                str+="<div class='col-sm-6 col-md-4'>"+
                    "<div class='thumbnail'>"+
                    "<img src='/images/"+elem.pict+"' alt='img1'>"+
                    "<div class='caption'>"+
                    "<h3>Thumbnail label</h3>"+
                    "<p>...</p>"+
                    "<p><a href='#' class='btn btn-primary' role='button'>Button</a> <a href='#' class='btn btn-default' role='button'>Button</a></p>"+
                    "</div>"+
                    "</div>"+
                    "</div>";
            });
            db.close();
        });
    });
  res.render('index', { title: '周氏大本营', thumbnails:str, pers:per });
});

module.exports = router;
