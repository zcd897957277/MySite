// 获取元素
function fGetElement() {
    let c = new Array();
    for (let b = 0; b < arguments.length; b++) {
        let a = arguments[b];
        // 判断是否是字符串类型
        if (typeof a == "string") {
            // 获取a
            a = document.getElementById(a)
        }
        if (arguments.length == 1) {
            return a;
        }
        c.push(a);
    }
    return c;
}

//布局控制
const PIndexControl = {
    aDomAry:[],middleNavigThumbnail:null
    , pInitLayout: function () {//初始化布局
        // 获取元素
        if (this.aDomAry.length < 2) {
            this.aDomAry = fGetElement("middleAll_navigation_thumbnail");
        }
        this.middleNavigThumbnail=$(this.aDomAry)[0];

        //方法调用
        this.pagination();
    },
    pagination:function(){//主体中的缩略图的分页
        let middleNavigThumbnail=$(this.middleNavigThumbnail);
        let lis=$(middleNavigThumbnail).find('ul.pagination>li');
        $(lis).each(function(i,elem){
            if(!$(elem).hasClass('disabled')){
                $(elem).on('click',function(){
                    //选中样式的转换
                    $(this).siblings().removeClass('active');
                    let sibs=$(this).siblings();
                    $(sibs).each(function(j,elemj){
                        if(!$(elemj).hasClass('disabled')){
                            if($(elemj).find('span').length<1){
                                $(elemj).children('span').text($(elemj).children('span').text());
                            }else if($(elemj).find('span').length>1){
                                if(!$(elemj).children('span').children('span').attr('aria-hidden')){
                                    $(elemj).children('span').children('span').remove();
                                }else{
                                    $($(elemj).children('span').children('span')).each(function(){
                                        if($(this).hasClass('sr-only')){
                                            $(this).remove();
                                        }
                                    });
                                }
                            }
                        }
                    });
                    $(this).addClass('active');
                    if($(this).children('span').children('span').attr('aria-hidden')){
                        $(this).children('span').append("<span class='sr-only'>>></span>");
                    }else{
                        //异步查取图片信息
                        loadXMLDoc(i);
                        $(this).children('span').append("<span class='sr-only'>"+i+"</span>");
                    }
                    //分页功能实现
                    function loadXMLDoc(num) {
                        let xmlhttp;
                        if (window.XMLHttpRequest)
                        {
                            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                            xmlhttp=new XMLHttpRequest();
                        }
                        else
                        {
                            // IE6, IE5 浏览器执行代码
                            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        xmlhttp.onreadystatechange=function() {
                            if (xmlhttp.readyState==4 && xmlhttp.status==200)
                            {
                                console.log("成功分页！");
                            }
                        };
                        xmlhttp.open("GET","/?pict_num="+num,true);
                        xmlhttp.send();
                    }
                })
            }
        });
    }
};
// 初始化布局
PIndexControl.pInitLayout();