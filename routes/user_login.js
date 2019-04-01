var express = require('express');
var router = express.Router();
var db = require('../models/DB');
var svgCaptcha = require('svg-captcha');
var session = require("express-session");

/* GET home page. */
router.post('/login_selvet', function(req, res, next) {
    console.log(req.body.Email+req.body.pass);
    db.SelectDB("SELECT * FROM `账户信息表` WHERE 电子邮箱='"+req.body.Email+"' AND 用户密码='"+req.body.pass+"'" ,function(err,result){
        console.log(result);
        console.log(err);
        if(err==null&&result!=""){
            res.send({
                success:true,
                result:result[0]
            });
        }else {
           res.send({success:false});
        }
    });

});

router.post('/register_selvet', function(req, res, next) {
   var id="kylin-"+(Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
  console.log(req.body.email);
  console.log(req.body.times);
    db.AddDB("INSERT INTO 账户信息表(用户ID,电子邮箱,用户名,用户密码,头像,性别,简介,生日,注册时间,认证标识) VALUES(?,?,?,?,?,?,?,?,?,?)" ,[id,req.body.email,req.body.name,req.body.pass,"/public/images/user.jpg",'','','',req.body.time,''],function(err,result){
        console.log(err);
        if(err==null&&result!=""){
            res.send({success:true});
        }else {
           res.send({success:false});
        }
    });

});

//必须为POST方法
router.post('/captcha', function (req, res,next) {
    var codeConfig = { 
        size: 4,// 验证码长度 
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i 
        noise: 2, // 干扰线条的数量 
        height:45
    }
      var captcha = svgCaptcha.create(codeConfig);
      req.session.captcha = captcha.text;
    console.log(req.session.captcha);
      res.type('svg');
      res.status(200).send(captcha.data);
  });

//验证客户端发送的验证码内容是否和服务器中的一致
router.post('/check', function (req, res, next) {
    
    if(req.body.Captcha==req.session.captcha)
    {
        res.send({success:true});
        console.log(req.body.Captcha);
    }else
    {
        res.send({success:false});
    }
    
	
});



module.exports = router;