Motie.bookMark=function(t){var o,e,a,i=this,n=Motie.bookMark,r=(n.simulate,n.dialog),l=0;Motie.TextareaUtils,n.area,null==r&&(r=n.createDialog()),this.ele=t,this.$ele=o=$(t),this.id=o.attr("id"),this.bookid=o.attr("bookid"),this.pos=(e=o.find("em")).length?[e.position().left,e.position().top]:0,this.strlen=void 0!=(l=o.attr("len"))?l:"",this.hasMark=!1,this.textlen=o.text().length,2==this.pos.length&&(n.id=o.find("em").attr("id"),this.createThumbtack("scroll")),this.check=a=function(t,o){var e={title:"要在这里添加书签吗？",whoOpen:"me",top:t.top},a=0;o&&$.extend(e,o),$("#ui-dialog-title-bookmMarkDialog").text(e.title),"me"==e.whoOpen?(a=t.len,r.html('<div class="bg"><p class="area">..'+t.text+"..</p></div>")):(a=i.textlen,r.html('<div class="bg"><p class="area">..'+e.html+"..</p></div>")),n.dialog.data({y:e.top,len:a,primary:i.id,bookId:i.bookid}),n.dialog.dialog("close").dialog("open");var l=n.dialog.next();return alreadyAttention||l.append('<span style="position: absolute; bottom: 20px; left: 10px;"><input id="attentionBook" type="checkbox" checked="checked" /> <label for="attentionBook">同时关注本书</label></span>'),!1};for(var s=o[0].childNodes,c=0;c<s.length;c++)3==s[c].nodeType&&$(s[c]).wrap('<span class="text-nodes"></span>');var k=o.find(".text-nodes");k.dblclick(function(t){var e=k.index(this),a=0,n="";if(e>0)for(var r=0;r<e;r++)n+=k.eq(r).text(),a+=k.eq(r).text().length;var l=rangy.getSelection(),s=l.getRangeAt(0).inspect(),c=s.substring(s.lastIndexOf(":")+1,s.lastIndexOf(")"));n+=$(this).text(),a+=parseInt(c),i.check({top:t.pageY-o.offset().top,text:n.slice(a-30,a-10)+'<span class="color-f60">'+n.slice(a-10,a+10)+"</span>"+n.slice(a+10,a+30),len:a})}).mouseenter(function(){n.currentPage=i}),o.mouseenter(function(){n.currentPage=i}).find("table").click(function(t){return t.stopPropagation(),!1})},Motie.bookMark.prototype.isOver=function(){Motie.bookMark.currentPage=this,this.check({top:this.$ele.height()-30},{whoOpen:"over",title:"没有下一章了",html:"是否在末尾添加书签？"})},Motie.bookMark.prototype.scrollTo=function(){$("body,html").animate({scrollTop:this.thumbtack.offset().top-15+"px"})},Motie.bookMark.prototype.createThumbtack=function(t){var o,e=this;return this.thumbtack=$('<span class="thumbtack" title="点击删除书签"></span>'),o=-35,this.thumbtack.css({top:this.pos[1]+o+"px"}).show(),this.$ele.after(this.thumbtack),this.thumbtack.click(function(){confirm("确实要删除书签吗？")&&$.ajax({url:"/ajax/book/bookmarker/del",type:"post",cache:!1,data:{id:Motie.bookMark.id},success:function(t){e.thumbtack.hide(),Motie.bookMark.id=0}})}),this.hasMark=!0,t&&this.scrollTo(),this.thumbtack},Motie.bookMark.createDialog=function(){var t,o,e=$('<div id="bookmMarkDialog" class="bookmark"></div>'),a=!1;return e.dialog({autoOpen:!1,minHeight:170,width:400,modal:!0,resizable:!1,title:"要在这里添加书签吗？",buttons:{"确定":function(){if(!a){var i=$(this),n=Motie.bookMark.currentPage;null==n&&i.dialog("close");var r=n.thumbtack,l=Motie.bookMark.cache;e.html('<div class="loading">保存中..</div>'),a=!0,t=$.ajax({url:"/ajax/book/bookmarker",cache:!1,type:"post",data:{position:i.data("len"),chapterId:i.data("primary"),bookId:i.data("bookId"),follow:function(){return alreadyAttention||!$("#attentionBook").length?"followed":$("#attentionBook").is(":checked")?"true":"false"}()},success:function(t){if("ok"==t.code){t.message;for(var s in l){var c=l[s];null!=c.thumbtack&&(c.hasMark=!1,c.thumbtack.hide())}alreadyAttention&&!$("#attentionBook").length||($("#attentionBook").parent().remove(),alreadyAttention=!0),null==r&&(Motie.bookMark.id=t.message,r=n.createThumbtack()),n.hasMark=!0,e.html('<div class="ok">保存成功！</div>'),o&&clearTimeout(o),o=setTimeout(function(){i.dialog("close"),a=!1,r.show().css({top:i.data("y")}),n.scrollTo()},500)}},error:function(){e.html('<div class="ok is-error"><span class="warningIco" style="margin-right: 5px;"></span>系统错误!</div>')}})}},"取消":function(){$(this).dialog("close"),o&&clearTimeout(o),t&&(a=!1,t.abort())}}}),Motie.bookMark.dialog=e,e},Motie.bookMark.createSimulate=function(){var t=$('<textarea title="双击添加书签" id="simulate" style="font-family: Arial,宋体;position: absolute; color:#000; display: block; border: none; word-wrap: break-word; overflow: hidden; white-space: pre-wrap; z-index: 20;" readonly="readonly"></textarea>');return t.css("opacity","0"),$body.append(t),Motie.bookMark.simulate=t,t},Motie.bookMark.cache={},Motie.bookMark.bind=function(t){var o=Motie.bookMark.cache;$("pre.note",t).each(function(){o[this.id]=new Motie.bookMark(this)})},Motie.bookMark.prototype.thumbtack=null,Motie.bookMark.currentPage=null,Motie.bookMark.dialog=null,Motie.bookMark.simulate=null;