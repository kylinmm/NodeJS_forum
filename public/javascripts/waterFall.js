//当页面加载完毕
$(window).on('load',function () {
    //1.实现瀑布流布局
    dataLoad();
    waterFall();
    //2.滚动加载
    $(window).on('scroll',function () {
        //判断是否加载
        if (checkWillLoad())
        {
            dataLoad(null);
            //1.实现瀑布流布局
            waterFall();
        }
    });
});

//实现瀑布流布局
function waterFall () {
    //拿到所有的盒子
    var allBox = $('#All_Pages > .Pages');
    //取出其中一个盒子的宽度
    var boxWidth = $(allBox).eq(0).outerWidth();
    //取出屏幕的高度
    var screenWidth = $(window).width();
    //求出列数 //取整函数取整
    var cols = Math.floor( screenWidth/boxWidth);
    //父标签居中
    $('#All_Pages').css({
        'width':cols * boxWidth + 'px',
        'margin':'0 auto'
    });
    //对子盒子定位
    var heightArr = [];
    //遍历
    $.each(allBox,function (index,value) {
        //取出单独盒子的高度
        var boxHeight = $(value).outerHeight();
        //判断是否第一行
        if(index < cols)
        {
            heightArr[index] = boxHeight;
        }
        else  //剩余的盒子要瀑布流布局
        {
            //求出最矮的盒子高度
            var minBoxHeight = Math.min.apply(null,heightArr);
            //取出最矮高度对应的索引  封装了js的这个方法
            var minBoxIndex = $.inArray(minBoxHeight,heightArr);
            //定位
            $(value).css({
                'position':'absolute',
                'top':minBoxHeight + 'px',
                'left':minBoxIndex * boxWidth + 'px'
            });
            //更新数组中最矮的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    })
    
}

//判断是否符合加载条件
function checkWillLoad() {
    //直接取出最后一个盒子
    var lastBox = $('#All_Pages > div').last();
    //取出最后一个盒子高度的一半 + 头部偏离的位置
    var lastBoxDis = $(lastBox).outerHeight() + $(lastBox).offset().top;
    //求出浏览器的高度
    var clientHeight = $(window).height();
    //求出页面偏离浏览器高度
    var scrollTopHeight = $(window).scrollTop();
    //比较返回
    return lastBoxDis <= clientHeight + scrollTopHeight;
    
}

function dataLoad(index){
	$.ajax({
                url: "http://127.0.0.1:3000/selvet",
                type: "POST",
                data: {
                    index:index
                      },
                success: function (data) {
                             alert("发送成功！");
            //遍历创建盒子
            $.each(data.data,function (index,value)//value为遍历的当前元素，index为当前索引，array为正在操作的数组
                   {
                    var dateee = new Date(value.开题时间).toJSON();
                    var date=dateee.split('T')[0];           
                       //创建一个div标签 设置它的类为'Pages' 添加到'All_Pages'里面去
                     $('#All_Pages').append('<div class="Pages">'+
					 '<div class="Pages_Content">'+
    '<div class="Pages_Pic">'+
      '<div><img style="height:120px; width:205px;" src="'+value.主题封面+'" class="img-rounded"></div>'+
    '</div>'+
    '<div class="PagesHeader">'+
      '<div style="margin:5px;"> <a style="text-decoration:none;color:#333; margin:5px;" href="http://127.0.0.1:3000/item/change?zhuti='+value.主题ID+'"><strong style=" font-size:20px;height: auto;word-wrap:break-word;word-break:break-all;overflow: hidden;">'+value.主题名+'</strong></a> </div>'+
    '</div>'+
    '<div style="padding-left:8px;"> <img id="userImg" style="height:26px; width:26px;" src="'+value.头像+'" class="img-circle"> <a href="#" style="padding-left:5px; text-decoration:none; color:#333; font-size:12px;">'+value.用户名+'</a>'+
      '<label  style="padding-left:60px;">'+date+'</label>'+
    '</div>'+
    '<div style="padding-bottom:8px; padding-top:10px;" class="PagesBottom">'+
      '<div class="others"> <a style="padding-left:5px;" href=""><span style="padding-top:2px;" class="glyphicon glyphicon-comment"></span>'+
        '<label style=" padding-left:5px; font-size:12px;">'+value.count+'条评论</label>'+
        '</a> <a style="padding-left:70px;" href=""><span style="padding-top:2px;" class="glyphicon glyphicon-send"></span></a> <a style="padding-left:10px;" href=""><span style="padding-top:2px;" class="glyphicon glyphicon-star"></span></a> </div>'+
    '</div>'+
	'</div>'+
  '</div>');
                   })
                      },
                error: function () {
                                    alert("请求超时错误!");
                      }
              })
}
