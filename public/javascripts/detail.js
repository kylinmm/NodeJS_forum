$(function(){
    /*$("#page").Page({
  totalPages:"<%=totalPages%>",//分页总数
  liNums: 7,//分页的数字按钮数(建议取奇数)
  activeClass: 'activP', //active 类样式定义
  callBack : function(page){
          //console.log(page)
            $.ajax({
                url: "http://127.0.0.1:3000/item/detail",
                type: "POST",
                data: {
                        currentage:page,
                        limit:5
                      },
                success: function (data) {
                             alert("发送成功！");		
                      },
                error: function () {
                                    alert("请求超时错误!");
                      }
              })
  }
});*/

$("#page").Page({
 // totalPages:"<%=totalPages%>",//分页总数
  totalPages:"<%=totalPages%>",
  liNums: 3,//分页的数字按钮数(建议取奇数)
  activeClass: 'activP', //active 类样式定义
  callBack : function(page){
          //console.log(page)
            $.ajax({
                url: "http://127.0.0.1:3000/item/detail",
                type: "GET",
                data: {
                    limit:5,
                    page:page
                      },
                success: function (data) {
                             alert("发送成功！");		
                      },
                error: function () {
                                    alert("请求超时错误!");
                      }
              })
  }
});

})