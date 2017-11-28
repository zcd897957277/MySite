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