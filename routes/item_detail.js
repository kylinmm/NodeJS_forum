var express = require('express');
var router = express.Router();
var db = require('../models/DB');

/* GET home page. */
router.get('/change', function(req, res, next) {
    console.log(req.query.zhuti);
   res.render("主题详情页.ejs",{zhuti:req.query.zhuti});
});
//获取数据库评论相关信息
router.post('/detail', function(req, res, next) {
  /*   var page;
    var limit;
if(req.query.limit!=undefined&&req.query.page!=undefined)
      { 
           limit = req.query.limit; 
           page=req.query.page;
      }else{
        limit=5;
        page=1;
      }
    console.log(page);
    console.log(limit); 

    var data = {
         currentPage:page,
         totalPages:0,
         title:123
    };
 

var data = {
    current:1,
    totalPages:0,
    title:123
};
    db.SelectDB("select count(*) as count from `回复表` where 主题ID='"+req.query.zhuti+"'" ,function(err,result){
        if(result!=""){
            var jsonData = JSON.stringify(result);// 转成JSON格式
            var r_result = JSON.parse(jsonData);
            console.log(r_result);
            console.log(r_result[0].count);
            data.totalPages = Math.ceil(result[0].count/limit);
            console.log("总页数："+data.totalPages);
        }else {
            console.log(err);
        }

         db.SelectDB("SELECT * FROM `回复表` WHERE `回复表`.`主题ID` = '123' LIMIT "+(page-1)*limit+","+limit+"",function(err,result){  
            
            data.items = result;  
            console.log("返回前获取："+data.totalPages);  
            res.render("detail",data);  
        }); 
        db.SelectDB("SELECT * FROM `回复表` WHERE `主题ID` = '"+req.query.zhuti+"'  LIMIT "+(page-1)*limit+","+limit+"",function(err,result){  
            var jsonData = JSON.stringify(result);// 转成JSON格式
            var r_result = JSON.parse(jsonData);// 转成JSON对象（再返回多组数据时会出现返回object需要转换为json格式和对象才可进行数据解析）
            data.items = r_result;  
            console.log("返回前获取："+ data.items[1]); 
            console.log("返回前获取："+ jsonData);  
            res.render("detail",data);  
        });
    });
   
     */
    var limit=req.body.pageSize;
    var zhuti=req.body.zhuti;
    var page=req.body.pageNumber;
     var data={
                "pageSize":5,
                "pageNumber":1,
                "totalRow":6,
                "totalPage":2,
                "list":[]
    }; //分页基础参数
    console.log(req.body.zhuti);

    data.pageNumber=parseInt(page);    
    db.SelectDB("select count(*) as count from `回复表` where 主题ID='"+req.body.zhuti+"'" ,function(err,result){
        if(result!=""){
            var jsonData = JSON.stringify(result);// 转成JSON格式
            var r_result = JSON.parse(jsonData);
            console.log(r_result);
            console.log(r_result[0].count);
            data.totalRow=result[0].count;
            data.totalPages = Math.ceil(result[0].count/limit);
            console.log("总页数："+data.totalPages);
        }else {
            console.log(err);
        }
 //SELECT `回复表`.`回复者ID`,`回复内容`,`回复时间`,`用户名`,`头像`,`认证标识` FROM `回复表`,`账户信息表` WHERE `回复表`.`回复者ID` = `账户信息表`.`用户ID` 
    db.SelectDB("SELECT * FROM `回复表`,`账户信息表` WHERE `主题ID` = '"+zhuti+"' AND `回复表`.`回复者ID`=`账户信息表`.`用户ID` LIMIT "+(page-1)*limit+","+limit+"",function(err,result){  
        var jsonData = JSON.stringify(result);// 转成JSON格式
        var r_result = JSON.parse(jsonData);// 转成JSON对象（再返回多组数据时会出现返回object需要转换为json格式和对象才可进行数据解析） 
       data.list=r_result;
        console.log("返回前获取："+ r_result); 
        console.log("返回前获取："+ jsonData);  
        console.log(data);
        res.send(data);  
    });
});

});

//获取数据库标题相关信息
router.post('/Title', function(req, res, next) {
    db.SelectDB("SELECT * FROM `主题详情表` WHERE 主题ID='"+req.body.zhuti+"'" ,function(err,result){
        if(result!=""){
            var jsonData = JSON.stringify(result);// 转成JSON格式
            var r_result = JSON.parse(jsonData);// 转成JSON对象（再返回多组数据时会出现返回object需要转换为json格式和对象才可进行数据解析） 
            console.log("Title返回前获取："+ r_result); 
            console.log("返回前获取："+ jsonData);  
            res.send(r_result);  
        }else {
            console.log(err);
        }
    });
});
module.exports = router;


/*
查询评论的所有信息 
SELECT
	`回复表`.`回复者ID`,
	`回复内容`,
	`回复时间`,
	`用户名`,
	`头像`,
	`认证标识` 
FROM
	`回复表`,
	`账户信息表` 
WHERE
	`回复表`.`回复者ID` = `账户信息表`.`用户ID` 
 */