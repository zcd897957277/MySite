const express = require('express');
const url=require('url');
const router = express.Router();
const MongoClient=require('mongodb').MongoClient,
    DB_CONN_STR='mongodb://zcd:123456@localhost:27017/mysite';//数据库为mysite
const querystring=require('querystring');

// 连接mongodb标准流程
// const selectData=function(db,collt,callback){
//     let collection=db.collection(collt);
//     //查询数据
//     collection.find().toArray(function (err,result) {
//         if(err){
//             console.log('Error:'+err);
//             return;
//         }
//         callback(result);
//     });
// };
// let str='',per='',pict_num='';
// function selectMongoData(pict_num) {
//     MongoClient.connect(DB_CONN_STR,function(err,db){
//         //查询数据中间缩略图 连接到picts表
//         selectData(db,'picts',function(result){
//             //删除之前积存的str
//             if(str){
//                 str='';
//             }
//             if(!pict_num){
//                 num=1;
//             }else{
//                 num=pict_num;
//             }
//             let leg=result.length;
//             let output=parseInt(num*6);
//             for(let j=1;j<result.length+1;j++){
//                 if(num>1){
//                     if(!((j<=parseInt((num-1)*6)) || (j>output))){
//                         str+="<div class='col-sm-6 col-md-4'>"+
//                             "<div class='thumbnail'>"+
//                             "<img src='/images/"+result[j-1].pict+"' alt='img1'>"+
//                             "<div class='caption'>"+
//                             "<h3>Thumbnail label</h3>"+
//                             "<p>...</p>"+
//                             "<p><a href='#' class='btn btn-primary' role='button'>Button</a> <a href='#' class='btn btn-default' role='button'>Button</a></p>"+
//                             "</div>"+
//                             "</div>"+
//                             "</div>";
//                     }
//                 }else if(num==1){
//                     if(!(j>output)){
//                         str+="<div class='col-sm-6 col-md-4'>"+
//                             "<div class='thumbnail'>"+
//                             "<img src='/images/"+result[j-1].pict+"' alt='img1'>"+
//                             "<div class='caption'>"+
//                             "<h3>Thumbnail label</h3>"+
//                             "<p>...</p>"+
//                             "<p><a href='#' class='btn btn-primary' role='button'>Button</a> <a href='#' class='btn btn-default' role='button'>Button</a></p>"+
//                             "</div>"+
//                             "</div>"+
//                             "</div>";
//                     }
//                 }
//             }
//             db.close();
//         });
//         //查询数据人物介绍 连接到person表
//         selectData(db,'person',function(result){
//             //删除之前积存的per
//             if(per){
//                 per='';
//             }
//             result.forEach(function(elem,index){
//                 per+="<div class='col-sm-6 col-md-4'>"+
//                     "<div class='thumbnail thumbnail_person'>"+
//                     "<img src='/images/"+elem.pict+"' alt='img1'>"+
//                     "<div class='caption person'>"+
//                     "<a class='person_name'>"+elem.name+"</a>"+
//                     "<p class='person_intro'>"+elem.intro+"</p>"+
//                     "</div>"+
//                     "</div>"+
//                     "</div>";
//             });
//             db.close();
//         });
//     });
// }
let str='',per='',pict_num='';
// router.get('/', function(req, res, next) {
//     if(url.parse(req.url).query!=null) {
//         let getNum=querystring.parse(url.parse(req.url).query)["pict_num"];
//         pict_num=getNum;
//     }
//     MongoClient.connect(DB_CONN_STR,function(err,db){
//         //查询数据中间缩略图 连接到picts表
//         let picts=db.collection('picts');
//         //查询数据
//         picts.find().toArray(function (err,result) {
//             if(err){
//                 console.log('Error:'+err);
//                 return;
//             }
//             //删除之前积存的str
//             if(str){
//                 str='';
//             }
//             if(!pict_num){
//                 num=1;
//             }else{
//                 num=pict_num;
//             }
//             let leg=result.length;
//             let output=parseInt(num*6);
//             for(let j=1;j<result.length+1;j++){
//                 if(num>1){
//                     if(!((j<=parseInt((num-1)*6)) || (j>output))){
//                         str+="<div class='col-sm-6 col-md-4'>"+
//                             "<div class='thumbnail'>"+
//                             "<img src='/images/"+result[j-1].pict+"' alt='img1'>"+
//                             "<div class='caption'>"+
//                             "<h3>Thumbnail label</h3>"+
//                             "<p>...</p>"+
//                             "<p><a href='#' class='btn btn-primary' role='button'>Button</a> <a href='#' class='btn btn-default' role='button'>Button</a></p>"+
//                             "</div>"+
//                             "</div>"+
//                             "</div>";
//                     }
//                 }else{
//                     if(!(j>output)){
//                         str+="<div class='col-sm-6 col-md-4'>"+
//                             "<div class='thumbnail'>"+
//                             "<img src='/images/"+result[j-1].pict+"' alt='img1'>"+
//                             "<div class='caption'>"+
//                             "<h3>Thumbnail label</h3>"+
//                             "<p>...</p>"+
//                             "<p><a href='#' class='btn btn-primary' role='button'>Button</a> <a href='#' class='btn btn-default' role='button'>Button</a></p>"+
//                             "</div>"+
//                             "</div>"+
//                             "</div>";
//                     }
//                 }
//             }
//             db.close();
//         });
//     });
//     next();
// });
// router.get('/', function(req, res, next) {
//     MongoClient.connect(DB_CONN_STR,function(err,db){
//         //查询数据人物介绍 连接到person表
//         let person=db.collection('person');
//         person.find().toArray(function (err,result) {
//             if(err){
//                 console.log('Error:'+err);
//                 return;
//             }
//             //删除之前积存的per
//             if(per){
//                 per='';
//             }
//             result.forEach(function(elem,index){
//                 per+="<div class='col-sm-6 col-md-4'>"+
//                     "<div class='thumbnail thumbnail_person'>"+
//                     "<img src='/images/"+elem.pict+"' alt='img1'>"+
//                     "<div class='caption person'>"+
//                     "<a class='person_name'>"+elem.name+"</a>"+
//                     "<p class='person_intro'>"+elem.intro+"</p>"+
//                     "</div>"+
//                     "</div>"+
//                     "</div>";
//             });
//
//             db.close();
//         });
//     });
//     res.render('index', { title: '周氏大本营',thumbnails:str, pers:per });
// });
router.get('/', function(req, res, next) {
    if(url.parse(req.url).query!=null) {
        let getNum=querystring.parse(url.parse(req.url).query)["pict_num"];
        pict_num=getNum;
    }
    MongoClient.connect(DB_CONN_STR,function(err,db){
        //查询数据中间缩略图 连接到picts表
        let picts=db.collection('picts');
        //查询数据
        picts.find().toArray(function (err,result) {
            if(err){
                console.log('Error:'+err);
                return;
            }
            //删除之前积存的str
            if(str){
                str='';
            }
            if(!pict_num){
                num=1;
            }else{
                num=pict_num;
            }
            let leg=result.length;
            let output=parseInt(num*6);
            for(let j=1;j<result.length+1;j++){
                if(num>1){
                    if(!((j<=parseInt((num-1)*6)) || (j>output))){
                        str+="<div class='col-sm-6 col-md-4'>"+
                            "<div class='thumbnail'>"+
                            "<img src='/images/"+result[j-1].pict+"' alt='img1'>"+
                            "<div class='caption'>"+
                            "<h3>"+result[j-1].name+"</h3>"+
                            "<p>"+result[j-1].intro+"</p>"+
                            "<p><a href='#' class='btn btn-primary' role='button'>简介</a> <a href='#' class='btn btn-default' role='button'>博客</a></p>"+
                            "</div>"+
                            "</div>"+
                            "</div>";
                    }
                }else{
                    if(!(j>output)){
                        str+="<div class='col-sm-6 col-md-4'>"+
                            "<div class='thumbnail'>"+
                            "<img src='/images/"+result[j-1].pict+"' alt='img1'>"+
                            "<div class='caption'>"+
                            "<h3>"+result[j-1].name+"</h3>"+
                            "<p>"+result[j-1].intro+"</p>"+
                            "<p><a href='#' class='btn btn-primary' role='button'>简介</a> <a href='#' class='btn btn-default' role='button'>博客</a></p>"+
                            "</div>"+
                            "</div>"+
                            "</div>";
                    }
                }
            }

            if(url.parse(req.url).query!=null){
                res.send({"thumbnails":str});
            }else{
                next();
            }
        });

        db.close();
    });


});
router.get('/', function(req, res, next) {
    MongoClient.connect(DB_CONN_STR,function(err,db){
        //查询数据人物介绍 连接到person表
        let person=db.collection('person');
        person.find().toArray(function (err,result) {
            if(err){
                console.log('Error:'+err);
                return;
            }
            //删除之前积存的per
            if(per){
                per='';
            }
            result.forEach(function(elem,index){
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
            res.render('index', { title: '周氏大本营',thumbnails:str, pers:per });
        });

        db.close();
    });
});

module.exports = router;
