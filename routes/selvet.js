var express = require('express');
var router = express.Router();
var db = require('../models/DB');
var fs = require("fs");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/* GET home page. */
router.post('/', function(req, res, next) {
  var data={
    data:[]
  }
  db.SelectDB(" SELECT ROW_NUMBER() OVER(ORDER BY zhuti.`开题时间` DESC) AS id,zhuti.`主题ID`,zhuti.`主题名`,zhuti.`主题分类`,zhuti.`主题封面`,zhuti.`开题时间`,zhuti.`用户名`,zhuti.`头像`,num.count FROM ( 	select `主题详情表`.`主题ID`,`主题名`,`主题分类`,`主题封面`,`开题时间`,`用户名`,`头像` from `主题详情表`,`账户信息表` where `主题详情表`.`开题者ID`=`账户信息表`.`用户ID` ) as zhuti, ( select `主题详情表`.`主题ID`,COUNT(*) as count from `主题详情表`,`回复表` where `主题详情表`.`主题ID`=`回复表`.`主题ID` GROUP BY `主题ID`) as num where zhuti.`主题ID` = num.`主题ID`" ,function(err,result){
    if(err){
        res.send("查询失败"+err);
    }else {
      /* result.forEach(function(value , index , array){ //value为遍历的当前元素，index为当前索引，array为正在操作的数组
        data.PageData.push(value);
      }) */
      var jsonData = JSON.stringify(result);// 转成JSON格式
      var r_result = JSON.parse(jsonData);// 转成JSON对象（再返回多组数据时会出现返回object需要转换为json格式和对象才可进行数据解析）ps:此步操作可以去除rowDatapaba字段 
      data.data=r_result;
       console.log(data);
       res.send(data);
    }
});
});

router.post('/Pic_upload',function(req, res, next){
 
  console.log(req.files);  // 上传的文件信息
 
  var des_file = ".\\public\\Page_Pic" + "/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
       fs.writeFile(des_file, data, function (err) {
        if( err ){
             console.log( err );
        }else{
              response = {
                success:true, 
                file_path:'\\Page_Pic\\'+req.files[0].originalname
             };
         }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
  });

});

router.post('/Page_upload', function(req, res, next) {
  var data={
    PageData:[]
  }
 console.log(req.body.Page+"-"+req.body.time);
  db.AddDB("INSERT INTO 回复表(主题ID,回复者ID,回复内容,回复时间) VALUES(?,?,?,?)" ,[req.body.zhuti,req.body.userID,req.body.Page,req.body.time],function(err,result){
    console.log(err);
    if(err==null&&result!=""){
        res.send({success:true});
    }else {
       res.send({success:false});
    }
});
});

router.post('/ZTPIC', function(req, res, next) {
  var data={
    PageData:[]
  }
 console.log(req.body.Page+"-"+req.body.time);
  db.AddDB("INSERT INTO 回复表(主题ID,回复者ID,回复内容,回复时间) VALUES(?,?,?,?)" ,[req.body.zhuti,req.body.userID,req.body.Page,req.body.time],function(err,result){
    console.log(err);
    if(err==null&&result!=""){
        res.send({success:true});
    }else {
       res.send({success:false});
    }
});
});

router.post('/TitlePic_upload',function(req, res, next){
  console.log(req.files);  // 上传的文件信息
 
  var des_file = ".\\public\\Title_Pic" + "/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
       fs.writeFile(des_file, data, function (err) {
        if( err ){
             console.log( err );
        }else{
              response = {
                success:true, 
                path:'/Title_Pic/'+req.files[0].originalname
             };
         }
         console.log( response );
         res.writeHead(200, {'Content-Type': 'application/json'});
         res.end( JSON.stringify( response ) );
      });
  });
});


router.post('/Title_upload', function(req, res, next) {
  var id="zhuti-"+(Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
 console.log(req.body.Page+"-"+req.body.time);
  db.AddDB("INSERT INTO 主题详情表(主题ID,主题名,主题封面,主题分类,开题者ID,主题内容,开题时间,收藏量,浏览量) VALUES(?,?,?,?,?,?,?,?,?)" ,[id,req.body.zhuti,req.body.pic,"",req.body.userID,req.body.Page,req.body.time,null,null],function(err,result){
    console.log(err);
    if(err==null&&result!=""){
      db.AddDB("INSERT INTO 回复表(主题ID,回复者ID,回复内容,回复时间) VALUES(?,?,?,?)" ,[id,"admin",null,req.body.time],function(err,result){});
        res.send({success:true});
    }else {
       res.send({success:false});
    }
});
});


module.exports = router;


/*格式化版的sql查询语句
SELECT
	zhuti.`主题ID`,
	zhuti.`主题名`,
	zhuti.`主题封面`,
	zhuti.`开题时间`,
	zhuti.`用户名`,
	zhuti.`头像`,
	num.count 
FROM
	(
SELECT
	`主题详情表`.`主题ID`,
	`主题名`,
	`主题封面`,
	`开题时间`,
	`用户名`,
	`头像` 
FROM
	`主题详情表`,
	`账户信息表` 
WHERE
	`主题详情表`.`开题者ID` = `账户信息表`.`用户ID` 
	) AS zhuti,
	(
SELECT
	`主题详情表`.`主题ID`,
	COUNT( * ) AS count 
FROM
	`主题详情表`,
	`回复表` 
WHERE
	`主题详情表`.`主题ID` = `回复表`.`主题ID` 
GROUP BY
	`主题ID` 
	) AS num 
WHERE
    zhuti.`主题ID` = num.`主题ID`
    
   // ps:通过将两个查询语句分别做成两个临时表在根据相同字段进行查询
*/ 