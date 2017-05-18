"use strict";$.fn.extend({popOver:function(t){function e(t){var e=h.innerHeight(),a=(h.innerWidth(),t.offset().top,t.offset().left),s=0,n=0,i=$(window).height();"up"==r.direction&&(s=i-t.innerHeight()-e-30,h.addClass("up"),n=a),"down"==r.direction&&(h.addClass("down"),n=a),o.addClass("show")}var o=$(this),a=$(this).data("prop"),s=$("#"+a),n=$(this).attr("showPop");if("true"===n)return s.hide(),o.removeClass("showPop"),$(this).attr("showPop","false"),void $(this).removeClass("chapterFontSize-on");if("false"===n)return s.show(),o.addClass("showPop"),$(this).attr("showPop","true"),void $(this).addClass("chapterFontSize-on");var i={tpl:"<a>哈哈,我是popOver</a>",layout:'<div class="popOver" data-show=true></div>',direction:"up"},r=$.extend(i,t),u=$(this).data("prop"),d=$(r.tpl),h=$(r.layout);h.attr("id",u),h.append(d),o.append(h),e(o),h.show(),h.on("touchend",function(t){t.preventDefault(),t.stopPropagation()}),$(this).attr("showPop",!0)}}),$.fn.scrollEnd=function(t,e){$(this).scroll(function(){var o=$(this);o.data("scrollTimeout")&&clearTimeout(o.data("scrollTimeout")),o.data("scrollTimeout",setTimeout(t,e))})},$(function(){function t(t){var e=t.data("show");e?($(".popOver").hide(),u.removeClass("show").hide(),d.removeClass("show").hide(),p.removeClass("showPop"),c.removeClass("showPop"),$("#chapterFontSize").attr("showPop",!1),d.find("li").removeClass("chapterFontSize-on"),t.data("show",!1),$("#chapterFontSize, #chapterAutoBuy").data("show",!1)):(u.addClass("show").show(),d.addClass("show").show(),t.data("show",!0))}function e(){function e(e){var e=e||window.event,h=new Date;switch(e.type){case"touchstart":var l=$(e.target.parentNode);if(!l.hasClass("intro"))return;o=e.touches[0].clientX,a=e.touches[0].clientY;var f=h.getTime(),m=f-i;m<300&&m>0&&(clearTimeout(r),$(document).data("show")&&($(".popOver").hide(),u.removeClass("show").hide(),d.removeClass("show").hide(),p.removeClass("showPop"),c.removeClass("showPop"),d.find("li").removeClass("chapterFontSize-on"),$(document).data("show",!1),$("#chapterFontSize").data("show","no"),$("#chapterAutoBuy").data("show","no")),e.preventDefault()),i=f;break;case"touchend":s=e.changedTouches[0].clientX,n=e.changedTouches[0].clientY,s==o&&n==a?r=setTimeout(function(){t($(document))},300):$(document).data("show")&&t($(document));break;case"touchmove":$(document).data("show")&&e.preventDefault()}}document.addEventListener("touchstart",e,!1),document.addEventListener("touchmove",e,!1),document.addEventListener("touchend",e,!1)}$("#fontBulb").on("touchend",function(t){var e=$(this),o=$(".wrapper"),a=e.find("img"),s=e.find("span"),n=$(".fontBulb"),i=n.find("img");e.data("status")?(localStorage.setItem("readStatus","day"),$.cookie("fontBulb"," ",{path:"/",expires:7}),o.removeClass("night-status").addClass("day-status"),a.attr("src",window.GLOBAL_PATH+"/_resources/img/wx/laikan/chapter-menu_status.png"),i.attr("src",GLOBAL_PATH+"/_resources/img/mobile/chapter_day_ico.png"),s.html("白天"),e.data("status",!1),n.data("status",!1),t.stopPropagation(),t.preventDefault()):(localStorage.setItem("readStatus","night"),$.cookie("fontBulb","changBg",{path:"/",expires:7}),o.removeClass("day-status").addClass("night-status"),a.attr("src",window.GLOBAL_PATH+"/_resources/img/wx/laikan/chapter-menu_status-on.png"),i.attr("src",GLOBAL_PATH+"/_resources/img/mobile/chapter_nightn_ico.png"),s.html("黑夜"),e.data("status",!0),n.data("status",!0),t.stopPropagation(),t.preventDefault())}),$(".fontBulb").on("touchend",function(t){var e=$(this),o=e.find("img"),a=$("#fontBulb"),s=a.find("img"),n=a.find("span"),i=$(".wrapper");e.data("status")?(i.removeClass("night-status").addClass("day-status"),o.attr("src",GLOBAL_PATH+"/_resources/img/mobile/chapter_day_ico.png"),s.attr("src",window.GLOBAL_PATH+"/_resources/img/wx/laikan/chapter-menu_status.png"),n.html("白天"),e.data("status",!1),a.data("status",!1),localStorage.setItem("readStatus","day"),$.cookie("fontBulb"," ",{path:"/",expires:7}),t.stopPropagation(),t.preventDefault()):(i.removeClass("day-status").addClass("night-status"),o.attr("src",GLOBAL_PATH+"/_resources/img/mobile/chapter_nightn_ico.png"),s.attr("src",window.GLOBAL_PATH+"/_resources/img/wx/laikan/chapter-menu_status-on.png"),n.html("黑夜"),e.data("status",!0),a.data("status",!0),localStorage.setItem("readStatus","night"),$.cookie("fontBulb","changBg",{path:"/",expires:7}),e.data("status",!0),t.stopPropagation(),t.preventDefault())});var o,a,s,n,i,r,u=$(".chapter-menu-top"),d=$(".chapter-menu-bottom"),h=$(".chapter-menu-top, .chapter-menu-bottom"),p=($(window).height(),d.find("#chapterFontSize")),c=u.find("#chapterAutoBuy");window.addEventListener("load",e,!1),$(".chapter-menu a").on("touchend",function(t){var e=$(this);location.href=e.attr("href"),t.preventDefault()}),h.on("touchend",function(t){t.stopPropagation(),t.preventDefault()}),$(".chapter-menu .status").on("touchend",function(t){var e=$(this),o=e.data("status");_hmt.push(["_trackEvent","menu","menu_"+o,bookId+"/"+chapterId]),t.preventDefault()});var l=1.2,f=2.8,m=$(".intro"),v=$.cookie("fontSize"),w=1.6;v&&(v=Number(v),w=v,$(".intro").css({"font-size":v+"rem","line-height":1.8*v+"rem"})),$("#chapterFontSize").on("touchend",function(t){var e=$(this);e.addClass("chapterFontSize-on"),e.addClass("showPop"),e.popOver({tpl:$("#template-dialog-font").html(),direction:"up"}),$(".fontSizePlus, .fontSizeMinus").unbind("touchend"),$(".fontSizePlus").on("touchend",function(t){w<=f&&(w+=.2,m.css({fontSize:w+"rem","line-height":1.8*w+"rem"}),$.cookie("fontSize",w,{path:"/",expires:7})),t.preventDefault(),t.stopPropagation()}),$(".fontSizeMinus").on("touchend",function(t){w>=l&&(w-=.2,m.css({fontSize:w+"rem","line-height":1.8*w+"rem"}),$.cookie("fontSize",w,{path:"/",expires:7})),t.preventDefault(),t.stopPropagation()}),t.preventDefault(),t.stopPropagation()}),$(".fontSizePlus").on("touchend",function(t){w<=f&&(w+=.2,m.css({fontSize:w+"rem","line-height":1.8*w+"rem"}),$.cookie("fontSize",w,{path:"/",expires:7})),t.preventDefault(),t.stopPropagation()}),$(".fontSizeMinus").on("touchend",function(t){w>=l&&(w-=.2,m.css({fontSize:w+"rem","line-height":1.8*w+"rem"}),$.cookie("fontSize",w,{path:"/",expires:7})),t.preventDefault(),t.stopPropagation()}),$("#chapterAutoBuy").on("touchend",function(t){var e=$(this);e.addClass("showPop"),e.popOver({tpl:$("#template-dialog-buy").html(),direction:"down"}),$(".chapterAuto").on("touchend",function(t){var e=$(this),o=e.find('input[name="bookId"]').val();$.ajax({type:"POST",url:"/wx/ajax/i/autofeed",data:{bookId:o,backUrl:"/book/"+o+"/"+window.chapterId},dataType:"json",success:function(t){return 1==t.status?void(location.href=t.url):void(0==t.status&&(e.data("auto")?(e.removeClass("on"),e.data("auto",!1)):(e.addClass("on"),e.data("auto",!0))))}}),t.stopPropagation(),t.preventDefault()}),t.stopPropagation(),t.preventDefault()})});
//# sourceMappingURL=../maps/wx/popOver.js.map