var express = require('express');
var router = express.Router();
var db = require('../models/DB');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('首页');
});

router.get('/ceshi', function(req, res, next) {
    res.render('测试');
});
router.get('/Write', function(req, res, next) {
    res.render('write');
});
router.get('/admin', function(req, res, next) {
    res.render('后台界面/login.ejs');
});
router.get('/index', function(req, res, next) {
    if(req.query.userID==""||req.query.userID==null||req.query.userID==undefined||req.query.Email==""||req.query.Email==null||req.query.Email==undefined)
    {
        res.render('后台界面/404.ejs', {
            title: 'No Found'
        });
    }else{
        db.SelectDB("SELECT * FROM `账户信息表` WHERE 用户ID='"+req.query.userID+"' AND 电子邮箱='"+req.query.Email+"'" ,function(err,result){
            console.log(result);
            console.log(err);
            console.log(result[0].用户ID);
            if(err==null&&result!=""){
                res.render('后台界面/index.ejs',{USERID:result[0].用户ID,mail:result[0].电子邮箱,name:result[0].用户名,introduction:result[0].简介,time:result[0].注册时间,flag:result[0].权限等级}); 
            }else {
                res.render('后台界面/404.ejs', {
                    title: 'No Found'
                });
            }
        });
       
    }
  
});
/*  //处理404界面
router.get('*', function(req, res){
    res.render('后台界面/404.ejs', {
        title: 'No Found'
    })
});  */

module.exports = router;
