var PIC_PATH="11";
$(function() {
    $("#pic").click(function () {
   //隐藏了input:file样式后，点击头像就可以本地上传
    $("#upload").click();
    $("#upload").on("change",function(){
    var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
    if (objUrl) {
    $("#pic").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
    }
    });
    });
    $("#load").click(function (){
        var file = document.getElementById("upload")
        var formData = new FormData();
        formData.append('image',file.files[0]);
        console.log(formData);
        $.ajax({
            url: 'http://127.0.0.1:3000/selvet/TitlePic_upload',
            type:"POST", 
            data: formData,
            async: false,  
            cache: false,  
            contentType: false,  
            processData: false,  
            success: function(data){
                console.log(data.path);
                PIC_PATH="http://127.0.0.1:3000"+data.path;//此处需在服务器配置请求头为json  否则浏览器会将返回值当做html处理导致读取不出返回值
                console.log(PIC_PATH);
                alert("上传成功！");
            },
            error: function(err){
                console.log('error: ' + err);
            }
        });
    })
});


     
    //建立一個可存取到該file的url
    function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
    url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
    }





$(function(){
    Simditor.locale = 'zh-CN';//设置中文
    var editor = new Simditor({
        textarea: $("#editor"),  //textarea的id
        placeholder: '请输入主题内容',
        toolbar:  ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment'], //工具条都包含哪些内容
        pasteImage: true,//允许粘贴图片
        upload : {
            url : 'http://127.0.0.1:3000/selvet/Pic_upload', //文件上传的接口地址
            params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
            fileKey:'image', //服务器端获取文件数据的参数名
            connectionCount: 3,
            leaveConfirm: '正在上传文件'
        }
    });
  });
$("#action").click(function () {  
var userID;
var time=getNowFormatDate();
var content = $(".simditor-body").html();
if($.cookie("用户ID")!=null&&$.cookie("用户密码")!=null){
    userID=$.cookie("用户ID");
}
var zhuti=$("#Title").val();
if(PIC_PATH==null||PIC_PATH==undefined||PIC_PATH==""){
    alert("主题图片尚未上传完成请稍后再试！");
}else{
   //向服务器发送数据
$.ajax({
url: "http://127.0.0.1:3000/selvet/Title_upload",
type: "POST",
data: {
    userID:userID,
    zhuti:zhuti,
    pic:PIC_PATH,
    Page:content,
    time:time
},
success: function (data) {
     alert("发送成功！");
     if(data.success){
        alert("接受成功！");
     }else{
        alert("接受失败！");
     }
},
error: function () {
    alert("请求超时错误!");
}
}) 
}
 
  })

  
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

function getUrlParam(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
var r = window.location.search.substr(1).match(reg);  //匹配目标参数
if (r!=null) return unescape(r[2]); return null; //返回参数值
} 
