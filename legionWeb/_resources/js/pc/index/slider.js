function autoPlay(){num++;var s=$("#uls li").length;num>s-1&&(num=0),$("#uls li").removeClass("show").addClass("hide"),$("#uls li:eq("+num+")").addClass("show").removeClass("hide"),$("#lis li").removeClass("bg").addClass("out"),$("#lis li:eq("+num+")").addClass("bg").removeClass("out"),$("#text div").css("display","none"),$("#text div:eq("+num+")").css("display","block")}var num=0,time=null;time=setInterval(autoPlay,3e3),$("#uls").mouseover(function(){clearInterval(time)}).mouseout(function(){time=setInterval(autoPlay,3e3)}),$("#lis li").mouseover(function(){clearInterval(time),num=$(this).index()-1,autoPlay()}),$("#nav").on("mouseover","li",function(){$(this).addClass("br").siblings().removeClass("br")});var arr=[],l1=$("#home").offset().top;$(window).scroll(function(){$("#nav").addClass("b_shadow"),0==$(this).scrollTop()&&$("#nav").removeClass("b_shadow");var s=$(this).scrollTop();$(".ConTxt").each(function(s){arr[s]=$(this).offset().top-80}),$.each(arr,function(a,l){s>=l&&$(".con_bar li").eq(a).addClass("bgr").siblings().removeClass("bgr")}),s<l1?$(".con_bar li").eq(0).removeClass("bgr"):s>$("#cooperation").offset().top+60&&($(".last").addClass("bgr"),$(".la_sec").removeClass("bgr"))}),$(".con_bar li").click(function(){$(this).hasClass("hover")&&$(this).removeClass("hover"),$(this).addClass("bgr").siblings().removeClass("bgr")}),$(".con_bar li").hover(function(){$(this).addClass("hover").siblings().removeClass("hover"),$(this).hasClass("bgr")&&$(this).removeClass("hover")},function(){$(this).removeClass("hover")}),function(){var s=location.hash.split("#")[1];$(".con_bar li[type="+s+"]").addClass("bgr")}();
//# sourceMappingURL=../../maps/pc/index/slider.js.map