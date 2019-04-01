// JavaScript Document

function check_login() {
	var Email = $("#user_name").val();
	var pass = $("#password").val();
	alert(Email);
	alert($.cookie("电子邮箱")+$.cookie("用户密码"));
	alert(Email+pass);
	if($.cookie("电子邮箱")!=null&&$.cookie("用户密码")!=null){
		Email=$.cookie("电子邮箱");
		pass=$.cookie("用户密码");
	}
	var login_status;
	//向服务器发送数据
$.ajax({
        url: "http://127.0.0.1:3000/user_login/login_selvet",
        type: "POST",
        data: {
            Email:Email,
			pass:pass
		},
        success: function (data) {
			 alert("发送成功！");
			 if (data.success) {		
				alert("登录成功！");
				$("#user_name").val("");
				$("#password").val("");	
				$('#myModal').modal('hide');
			    ChangeLogin(data);
				$.cookie("电子邮箱", Email);
				$.cookie("用户ID", data.result.用户ID);
				$.cookie("用户密码", pass);
			    alert($.cookie("电子邮箱"));
					
			} else {
				alert("登陆失败！");
				$("#login_form").removeClass('shake_effect');
				setTimeout(function () {
					$("#login_form").addClass('shake_effect')
				}, 1);
			}
           
        },
        error: function () {
            alert("请求超时错误!");
        }
    })
	
}
function check_register() {
	var name = $("#r_user_name").val();
	var pass = $("#r_password").val();
	var email = $("#r_email").val();
    var time=getNowFormatDate();
if (name != "" && pass != "" && email != "") {
	alert(email);
//向服务器发送数据
$.ajax({
	url: "http://127.0.0.1:3000/user_login/register_selvet",
	type: "POST",
	data: {
		email:email,
		name:name,
		pass:pass,
		time:time
	},
	success: function (data) {
		 alert("发送成功！");
		 if (data.success) {		
			alert("注册成功！");
			$("#user_name").val("");
			$("#password").val("");
		} else {
			$("#login_form").removeClass('shake_effect');
			setTimeout(function () {
				$("#login_form").addClass('shake_effect')
			}, 1);
			alert("注册失败！");
		}
	   
	},
	error: function () {
		alert("请求超时错误!");
	}
})
	} else {
		$("#login_form").removeClass('shake_effect');
		setTimeout(function () {
			$("#login_form").addClass('shake_effect')
		}, 1);
		alert("用户名不能为空！");
	}
}
//初始化方法
$(function () {
	$("#create").click(function () {
		check_register();
		return false;
	})
	$("#login").click(function () {
		check_login();
		return false;
	})
	$('.message a').click(function () {
		$('.form form').animate({
			height: 'toggle',
			opacity: 'toggle'
		}, 'slow');
	})
	$('#close').click(function () {
		$('#myModal').modal('hide');
	})
	$('#exit').click(function(){
		ChangeLogin();
		$.cookie("电子邮箱", null);
		$.cookie("用户密码", null);
		$.cookie("用户ID", null);
	})
 if($.cookie("电子邮箱")!=null&&$.cookie("用户密码")!=null){
		check_login();
	} 
})

//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
} 

function ChangeLogin(data){
	alert($('#login_Off').css('display'));
	if($('#login_Off').css('display')=="none"){
		$("#login_Off").css("display","block");
		$("#login_On").css("display","none");
	}else{
		$("#login_On").css("display","block");
		$("#login_Off").css("display","none");
		alert(data.result.用户名);
		$("#userInfo").text(data.result.用户名);
		$("#userImg").attr("src",data.result.头像);
	}
	
}