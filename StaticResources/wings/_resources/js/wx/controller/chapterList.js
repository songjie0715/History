"use strict";$.chapterList=$.chapterList||{},$.chapterList={chapterLoad:function(e,t,a){var r="";$.ajax({type:"get",url:"/wx/ajax/book/"+bookId+"/catalogs",data:{page:e,pageSize:t,isAsc:a},dataType:"json",success:function(t){var a="";$(".beforesend").hide(),e-=1,$(".clist_select").find("option").filter(function(){return this.value==e}).prop("selected",!0),a=$(".clist_select").children("option").eq(e).text(),$(".selectbox-div").html(a);for(var o=0;o<t.catalogs.length;o++)t.catalogs[o].vol?r+="<h2>"+t.catalogs[o].volume.name+"</h2>":(t.catalogs[o].chapter.free?isFree='<span class="free">免费</span>':isFree="",r+=t.catalogs[o].chapter.id==booklp?'<li class="on"><a href="/book/'+bookId+"/"+t.catalogs[o].chapter.id+'">'+t.catalogs[o].chapter.name+'<p class="chapter-tag">'+isFree+"</p></a></li>":'<li><a href="/book/'+bookId+"/"+t.catalogs[o].chapter.id+'">'+t.catalogs[o].chapter.name+'<p class="chapter-tag">'+isFree+"</p></a></li>");$(".wrapper").scrollTop(0),$("#chapterUl").html(r),$("body").attr({currentPage:e,totalPage:totalPage}),parseInt($("body").attr("currentPage"))==parseInt($("body").attr("totalPage"))-1?$(".mod-r ul li:eq(2)").css("background","#ddd").removeAttr("onclick"):$(".mod-r ul li:eq(2)").css("background","#fafafa").attr("onclick","$.chapterList.chapterNext()")},error:function(){}})},chapterPrev:function(){return 0==parseInt($("body").attr("currentPage"))?(location.href="/book/"+bookId,!1):($("#chapterUl").html(""),$(".beforesend").show(),currentPage--,void $.chapterList.chapterLoad(currentPage,pageSize,isAsc))},chapterNext:function(){return parseInt($("body").attr("currentPage"))!=parseInt($("body").attr("totalPage"))-1&&($("#chapterUl").html(""),$(".beforesend").show(),currentPage++,void $.chapterList.chapterLoad(currentPage,pageSize,isAsc))}},$(function(){var e=$(window).height();$(".wrapper").height(e),$.chapterList.chapterLoad(currentPage,pageSize,isAsc)}),$(".chapter-selectbox select").change(function(e){var t=$(this).val();currentPage=t,currentPage++,$.chapterList.chapterLoad(currentPage,pageSize,isAsc)}),$(".chapter-asc").on("touchend",function(e){var t=$(this);t.data("status")?(isAsc=!1,location.href="/book/"+bookId+"/catalogs?isAsc=false"):(isAsc=!0,location.href="/book/"+bookId+"/catalogs?isAsc=true"),e.stopPropagation(),e.preventDefault()});
//# sourceMappingURL=../../maps/wx/controller/chapterList.js.map
