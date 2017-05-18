!function(t){function e(t,e){var i=typeof t[e];return"function"===i||!("object"!=i||!t[e])||"unknown"==i}function i(t,e){return typeof t[e]!=f}function a(t,e){return!("object"!=typeof t[e]||!t[e])}function n(t){window.console&&window.console.log&&window.console.log("RangyInputs not supported in your browser. Reason: "+t)}function l(t,e,i){return e<0&&(e+=t.value.length),typeof i==f&&(i=e),i<0&&(i+=t.value.length),{start:e,end:i}}function s(t,e,i){return{start:e,end:i,length:i-e,text:t.value.slice(e,i)}}function d(){return a(document,"body")?document.body:document.getElementsByTagName("body")[0]}var o,r,c,u,m,p,h,v,g,f="undefined";t(document).ready(function(){function b(t,e){return function(){var i=this.jquery?this[0]:this,a=i.nodeName.toLowerCase();if(1==i.nodeType&&("textarea"==a||"input"==a&&"text"==i.type)){var n=[i].concat(Array.prototype.slice.call(arguments)),l=t.apply(this,n);if(!e)return l}if(e)return this}}var x=document.createElement("textarea");if(d().appendChild(x),i(x,"selectionStart")&&i(x,"selectionEnd"))o=function(t){var e=t.selectionStart,i=t.selectionEnd;return s(t,e,i)},r=function(t,e,i){var a=l(t,e,i);t.selectionStart=a.start,t.selectionEnd=a.end},g=function(t,e){e?t.selectionEnd=t.selectionStart:t.selectionStart=t.selectionEnd};else{if(!(e(x,"createTextRange")&&a(document,"selection")&&e(document.selection,"createRange")))return d().removeChild(x),void n("No means of finding text input caret position");o=function(t){var e,i,a,n,l=0,d=0,o=document.selection.createRange();return o&&o.parentElement()==t&&(a=t.value.length,e=t.value.replace(/\r\n/g,"\n"),i=t.createTextRange(),i.moveToBookmark(o.getBookmark()),n=t.createTextRange(),n.collapse(!1),i.compareEndPoints("StartToEnd",n)>-1?l=d=a:(l=-i.moveStart("character",-a),l+=e.slice(0,l).split("\n").length-1,i.compareEndPoints("EndToEnd",n)>-1?d=a:(d=-i.moveEnd("character",-a),d+=e.slice(0,d).split("\n").length-1))),s(t,l,d)};var w=function(t,e){return e-(t.value.slice(0,e).split("\r\n").length-1)};r=function(t,e,i){var a=l(t,e,i),n=t.createTextRange(),s=w(t,a.start);n.collapse(!0),a.start==a.end?n.move("character",s):(n.moveEnd("character",w(t,a.end)),n.moveStart("character",s)),n.select()},g=function(t,e){var i=document.selection.createRange();i.collapse(e),i.select()}}d().removeChild(x),u=function(t,e,i,a){var n;e!=i&&(n=t.value,t.value=n.slice(0,e)+n.slice(i)),a&&r(t,e,e)},c=function(t){var e=o(t);u(t,e.start,e.end,!0)},v=function(t){var e,i=o(t);return i.start!=i.end&&(e=t.value,t.value=e.slice(0,i.start)+e.slice(i.end)),r(t,i.start,i.start),i.text},m=function(t,e,i,a){var n,l=t.value;t.value=l.slice(0,i)+e+l.slice(i),a&&(n=i+e.length,r(t,n,n))},p=function(t,e){var i=o(t),a=t.value;t.value=a.slice(0,i.start)+e+a.slice(i.end);var n=i.start+e.length;r(t,n,n)},h=function(t,e,i){typeof i==f&&(i=e);var a=o(t),n=t.value;t.value=n.slice(0,a.start)+e+a.text+i+n.slice(a.end);var l=a.start+e.length,s=l+a.length;r(t,l,s)},t.fn.extend({getSelection:b(o,!1),setSelection:b(r,!0),collapseSelection:b(g,!0),deleteSelectedText:b(c,!0),deleteText:b(u,!0),extractSelectedText:b(v,!1),insertText:b(m,!0),replaceSelectedText:b(p,!0),surroundSelectedText:b(h,!0)}),t.fn.rangyInputs={getSelection:o,setSelection:r,collapseSelection:g,deleteSelectedText:c,deleteText:u,extractSelectedText:v,insertText:m,replaceSelectedText:p,surroundSelectedText:h}})}(jQuery),Motie=Motie||{},Motie.editor=Base.extend({constructor:function(t){var e={content:null,imgCount:0,musCount:0,caller:"main",autoComposeHandle:null,wordCal:!0,wordStatus:null,articleId:0,type:5,addMusicHandle:null,addVideoHandle:null,addLinkHandle:null,uploadImgHandle:null,uploadStatus:null,uploadImgUrl:MotieHost+"/ajax/articleImg/tempadd",uploadExt:/^(jpg|jpeg|gif|png)$/i,uploadErrorMsg:"只允许  JPG、jpeg、 GIF、PNG 的文件格式",uploadingText:"图片上传中...",uploadingClass:"uploading",uploadFileName:"uploadfile",onUploadComplete:$.noop,onDeleteImage:$.noop,onDeleteVideo:$.noop,delImgUrl:"",imgAppendTo:"#imageLabel",imgSelector:".articleImage",musAppendTo:"#musicLabel",musSelector:".articleMusic",videoSelector:".articleVideo",onAddMusic:$.noop,onAddVideo:$.noop,onDeleteMusic:$.noop},i=this;t&&$.extend(e,t),this.setting=e,this.imgCount=e.imgCount,this.musCount=e.musCount,this.videoCount=e.videoCount,this.content=null!==e.content&&$(e.content),this.wordStatus=null!==e.wordStatus&&$(e.wordStatus),this.uploadHandle=null!==e.uploadImgHandle&&$(e.uploadImgHandle),this.linkHandle=null!==e.addLinkHandle&&$(e.addLinkHandle),this.musicHandle=null!==e.addMusicHandle&&$(e.addMusicHandle),this.videoHandle=null!==e.addVideoHandle&&$(e.addVideoHandle),this.acHandle=null!==e.autoComposeHandle&&$(e.autoComposeHandle),this.imgLabel=null!==e.imgAppendTo&&$(e.imgAppendTo),this.musLabel=null!==e.musAppendTo&&$(e.musAppendTo),this.videoLabel=null!==e.videoAppendTo&&$(e.videoAppendTo),this.uploadHandle.length&&this.uploadImg(),this.linkHandle.length&&this.addLink(),this.acHandle.length&&this.autoCompose(),this.musicHandle.length&&this.addMusic(),this.videoHandle.length&&this.addVideo(),this.contentPos=0,this.content.click(function(){i.contentPos=i.content.getSelection().end}),e.wordCal&&this.content.length&&this.wordStatus.length&&this.wordCal();var a=this.imgLabel.find(e.imgSelector);a.length&&this.bindRemoveItem(a,"img",!0)&&this.bindLimit(a);var n=this.musLabel.find(e.musSelector);n.length&&this.bindRemoveItem(n,"mus",!0);var l=this.videoLabel.find(e.videoSelector);l.length&&this.bindRemoveItem(l,"video",!0)},wordCal:function(){return new Mo.wordsCalculation(this.content,this.wordStatus).Cal(this.content.text()),this},bindRemoveItem:function(t,e,i){var a=this,n=this.setting,l=a.content;t.each(function(){var t=$(this),s=t.find(".remove");t.hover(function(){s.removeClass("hidden")},function(){s.addClass("hidden")}),s.click(function(){var s=$.trim(t.find(".imgName").val()),d=s.substring(3,s.length-1);switch(l.val(l.val().replace(new RegExp(s,"gm"),"")),t.remove(),e){case"mus":i&&$.getJSON(n.delImgUrl,{resType:3,id:n.articleId,type:n.type,icon:d}),n.onDeleteMusic(a);break;case"img":i&&$.getJSON(n.delImgUrl,{resType:1,id:n.articleId,type:n.type,icon:d}),n.onDeleteImage(a);break;case"video":i&&$.getJSON(n.delImgUrl,{resType:2,id:n.articleId,type:n.type,icon:d}),n.onDeleteVideo(a)}})})},bindLimit:function(t){return $(t).each(function(){var t=$(this),e=t.find(".textarea"),i=t.find(".status");e.keyup(function(){Motie.limitTextarea(e,30,i)?e.removeAttr("long"):e.attr("long","long")}).trigger("keyup")}),this},autoCompose:function(){var t=this;this.acHandle.click(function(){t.content.val(Motie.editor.formatText(t.content.val()))})},uploadImg:function(){var t=this,e=t.setting,i=($(e.uploadStatus),this.content),a=(i[0],this.imgLabel),n=!1,l=this.uploadHandle;Motie.TextareaUtils,new AjaxUpload(l,{action:e.uploadImgUrl,name:e.uploadFileName,onSubmit:function(i,a){return!n&&(a&&e.uploadExt.test(a)?(l.text("上传中.."),void(n=!0)):(Mo.ui.info(l,t.setting.uploadErrorMsg,"mo-ui-info-warning"),!1))},onComplete:function(i,s){if(n=!1,l.text("添加图片"),""==$.trim(s))return void Mo.ui.info(l,"图片不能大于5M","mo-ui-info-warning");e.onUploadComplete(t,i,s);var d=$(s),o=t.content;a.append(d);var r=a.find(e.imgSelector);0==t.imgCount?t.imgCount=r.length:t.imgCount<r.length?t.imgCount=r.length:t.imgCount++,d.find(".imgName").val("<图片"+t.imgCount+">"),d.find("label").eq(0).attr("for","al"+t.imgCount).end().eq(1).attr("for","ac"+t.imgCount).end().eq(2).attr("for","ar"+t.imgCount),d.find(".posi").attr("name","posi"+t.imgCount).eq(0).attr("id","al"+t.imgCount).end().eq(1).attr("id","ac"+t.imgCount).end().eq(2).attr("id","ar"+t.imgCount),t.bindLimit(d),t.bindRemoveItem(d,"img",!1);var c="<图片"+t.imgCount+">";o.insertText(c,t.contentPos),t.contentPos+=t.contentPos+c.length,o.setSelection(t.contentPos,t.contentPos)}})},addLink:function(){var t=this,e=t.setting,i=e.caller,a=this.content,n=null;Motie.TextareaUtils,new Mo.layer({handle:this.linkHandle,tpl:"main"==i?Mo.layer.tplStore.basicTpl:Mo.layer.tplStore.SiteBasicTpl,data:{html:"main"==i?Mo.editor.addLinkTemplate:Mo.editor.addLinkTemplateSite,title:"添加链接"},width:550,destroy:!1,onShow:function(){n.resetForm()},onRendered:function(e){var i=e.layer,l=$("#addlink"),s=$("#texts"),d=$("#url"),o=i.find("form");n=o.validate({debug:!0,messages:{texts:{required:"链接文字不能为空"},url:{required:"链接不能为空",url:"链接格式不合法"}},errorClass:"is-error",errorPlacement:function(t,e){$("#"+e.attr("name")+"-msg").html(t)}}),l.click(function(){if(n.form()){var i="";i=i+'<a class="bule" href="'+d.val()+'">'+s.val()+"</a>",a.insertText(i,t.contentPos),e.hideLayer()}})}})},addVideo:function(){var t=this,e=this.setting,i=this.content;Motie.TextareaUtils,new Mo.layer({handle:this.videoHandle,data:{html:Motie.editor.addVideoTemplate},width:550,destroy:!0,onRendered:function(a){var n=a.layer,l=n.find("#addvideo"),s=n.find("form"),d=n.find("#videosrc");s.submit(function(){return!1}),l.click(function(){var n="",l=d.val();t.videoCount++,n="<视频"+t.videoCount+">";var s={};s={src:l,count:t.videoCount,width:200,height:180},i.insertText(n,t.contentPos);var o=$(Mustache.to_html(Motie.editor.videoTpl,s));return t.videoLabel.append(o),t.bindRemoveItem(o,"video"),e.onAddVideo(t),a.hideLayer(),!1})}})},addMusic:function(){var t,e=this,i=this.setting,a=this.content;Motie.TextareaUtils,jQuery.validator.addMethod("music",function(t,e){return this.optional(e)||/^http:\/\/www\.xiami\.com\/widget\/\d+_\d+\/singlePlayer.swf$/i.test(t)||/^http:\/\/www\.xiami\.com\/song\/\d+$/i.test(t)||/http:\/\/box\.baidu\.com\/widget\/flash\/mbsong\.swf\?name=.+&artist=.+/i.test(t)},"链接格式错误"),new Mo.layer({handle:this.musicHandle,data:{html:Motie.editor.addMusicTemplate},width:550,destroy:!1,onHide:function(e){t.resetForm()},onRendered:function(n){var l=n.layer,s=l.find("#addmusic"),d=l.find("form"),o=l.find("#src");t=d.validate({debug:!0,rules:{src:{music:!0,required:!0}},messages:{src:{music:"链接格式错误",required:"链接不能为空"}},errorClass:"is-error",errorPlacement:function(t,e){$("#"+e.attr("name")+"-msg").html(t)}}),s.click(function(){if(t.form()){var l="",s=o.val();e.musCount++,l="<音乐"+e.musCount+">";var d={};s.search("xiami")!=-1?(s.search("widget")==-1&&(s="http://www.xiami.com/widget/0_"+s.replace(/[^\d]*/i,"")+"/singlePlayer.swf"),d={src:s,count:e.musCount,width:275,height:33}):s.search("baidu")&&(d={src:s,count:e.musCount,width:400,height:95}),a.insertText(l,e.contentPos);var r=$(Mustache.to_html(Motie.editor.musTpl,d));e.musLabel.append(r),e.bindRemoveItem(r,"mus"),i.onAddMusic(e),n.hideLayer()}})}})}},{addLinkTemplate:'<a href="javascript:;" class="fr pop-close"></a><h3><img src="'+ImgMotie+'/_assets/title-review-the-book.gif" class="fl" />添加链接</h3><div class="sp-20"></div><div class="txtbox-editor"><form><table class="for-table" width="100%"><tbody><tr><td class="col1 vm" style="width:80px">链接文字：</td><td class="col2" width="330"><input name="texts" id="texts" class="text-single required" style="width: 300px;" /></td><td class="vm desc" id="texts-msg"></td></tr><tr><td class="col1">网址：</td><td class="col2"><input name="url" id="url" style="width: 300px;" class="text-single required url" /></td><td class="vm desc" id="url-msg">请以http://开头</td></tr><tr><td></td><td colspan="2"><div class="sp-10"></div><input type="submit" value="确定" title="确定" id="addlink" class="btn-submit btn-has-text fl" style="margin-right: 15px;" alt=""><div class="cl"></div></td></tr></tbody></table></form></div>',addLinkTemplateSite:'<form><div class="c-item"><label class="c-title">链接文字：</label><input name="texts" id="texts" class="text required" style="width: 300px;" /><span id="texts-msg"></span></div><div class="c-item"><label class="c-title">网址：</label><input name="url" id="url" style="width: 300px;" class="text required url" /><span id="url-msg">请以http://开头</span></div><div class="c-submit"><a href="javascript:;" title="确定" id="addlink" class="button" style="margin-right: 15px;">确定</a><a href="javascript:;" class="pop-close button">取消</a></div></form>',addMusicTemplate:'<a href="javascript:;" class="fr pop-close"></a><h3><img src="'+ImgMotie+'/_assets/title-review-the-book.gif" class="fl" />添加音乐</h3><div class="sp-20"></div><div class="txtbox-editor"><form><p class="desc">目前仅支持 <span class="color-f60">虾米</span> 和 <span class="color-f60">百度</span> 的Flash播放地址。</p><div class="sp-10"></div><table class="for-table" width="100%"><tbody><tr><td class="col1 vm al">地址：</td><td class="col2" width="330"><input name="src" id="src" style="width: 310px;" class="text-single required" /></td><td class="vm desc" id="src-msg"></td></tr><tr><td></td><td colspan="2"><div class="sp-10"></div><input type="submit" value="确定" title="确定" id="addmusic" class="btn-submit btn-has-text fl" style="margin-right: 15px;" alt=""><a href="javascript:;" class="pop-close fl btn-submit btn-has-text">取消</a><div class="cl"></div></td></tr></tbody></table></form></div>',addVideoTemplate:'<a href="javascript:;" class="fr pop-close"></a><h3><img src="'+ImgMotie+'/_assets/title-review-the-book.gif" class="fl" />添加视频</h3><div class="sp-20"></div><div class="txtbox-editor"><form><p class="desc">请填入flash的地址</p><div class="sp-10"></div><table class="for-table" width="100%"><tbody><tr><td class="col1 vm al">地址：</td><td class="col2" width="330"><input name="src" id="videosrc" style="width: 310px;" class="text-single" /></td><td class="vm desc" id="src-msg"></td></tr><tr><td></td><td colspan="2"><div class="sp-10"></div><input type="submit" value="确定" title="确定" id="addvideo" class="btn-submit btn-has-text fl" style="margin-right: 15px;" alt=""><a href="javascript:;" class="pop-close fl btn-submit btn-has-text">取消</a><div class="cl"></div></td></tr></tbody></table></form></div>',imgTpl:'\t\t<li class="articleImage">\t\t\t<table width="100%">\t\t\t\t<tr>\t\t\t\t\t<td width="160">\t\t\t\t\t\t<img src="{{url}}" alt="" class="img" />\t\t\t\t\t\t<input type="hidden" name="objectImage" value="{{url}}">\t\t\t\t\t</td>\t\t\t\t\t<td width="20" rowspan="2"></td>\t\t\t\t\t<td width="480">\t\t\t\t\t\t<textarea name="" id="" class="textarea input"></textarea>\t\t\t\t\t</td>\t\t\t\t\t<td rowspan="2"><span class="remove fr"></span></td>\t\t\t\t</tr>\t\t\t\t<tr>\t\t\t\t\t<td>\t\t\t\t\t\t<input type="text" name="imgName" class="imgName" id="" value="<图片1>" />\t\t\t\t\t</td>\t\t\t\t\t<td>\t\t\t\t\t\t<em class="desc fr fb">图片说明(<span class="status">0</span>)</em>\t\t\t\t\t\t<label for="al1"><input type="radio" name="posi{{count}}" id="al{{count}}" class="radio" />居左</label>\t\t\t\t\t\t<label for="ac1"><input type="radio" name="posi{{count}}" checked="checked" id="ac{{count}}" class="radio" />居中</label>\t\t\t\t\t\t<label for="ar1"><input type="radio" name="posi{{count}}" id="ar{{count}}" class="radio" />居右</label>\t\t\t\t\t</td>\t\t\t\t</tr>\t\t\t</table>\t\t</li>\t',musTpl:'\t\t<li class="articleMusic">\t\t\t<table width="100%">\t\t\t\t<tr>\t\t\t\t\t<td width="60"><input type="text" name="musName" class="imgName" id="" value="<音乐{{count}}>" /></td>\t\t\t\t\t<td width="20"></td>\t\t\t\t\t<td width="600">\t\t\t\t\t\t<input type="hidden" name="musUrl" value="{{src}}" />\t\t\t\t\t\t<p>\t\t\t\t\t\t\t<input type="text" class="input" name="musDesc" maxlength="30" />\t\t\t\t\t\t</p>\t\t\t\t\t\t<p><embed src="{{src}}" type="application/x-shockwave-flash" width="{{width}}" height="{{height}}" wmode="transparent"></embed></p>\t\t\t\t\t</td>\t\t\t\t\t<td width="26"><span class="remove fr"></span></td>\t\t\t\t</tr>\t\t\t</table>\t\t</li>\t',videoTpl:'\t\t<li class="articleVideo">\t\t\t<table width="100%">\t\t\t\t<tr>\t\t\t\t\t<td width="60"><input type="text" name="videoName" class="imgName" id="" value="<视频{{count}}>" /></td>\t\t\t\t\t<td width="20"></td>\t\t\t\t\t<td width="600">\t\t\t\t\t\t<input type="hidden" name="videoUrl" value="{{src}}" />\t\t\t\t\t\t<p>\t\t\t\t\t\t\t<input type="text" class="input" name="videoDesc" maxlength="30" />\t\t\t\t\t\t</p>\t\t\t\t\t\t<p><embed src="{{src}}" type="application/x-shockwave-flash" width="{{width}}" height="{{height}}" wmode="transparent"></embed></p>\t\t\t\t\t</td>\t\t\t\t\t<td width="26"><span class="remove fr"></span></td>\t\t\t\t</tr>\t\t\t</table>\t\t</li>\t',formatText:function(t){function e(t){var e=t.match(/(<a\b[^>]+>(.*?)<\/a>)/gi),i=[];if(t="　　"+t.replace(/[ \u3000\t\r]/g,"").replace(/[\n]+/g,"\r\n\r\n　　"),e&&e.length){i=t.match(/(<a[^>]+>(.*?)<\/a>)/gi);for(var a=0,n=i.length;a<n;a++)t=t.replace(i[a],e[a])}return t}for(var i=t.split("(\n\r)|(\n)"),a=null,n=0,l=[],s=i.length;n<s;n++){var a=i[n];""==a?l.push("\n\r"):l.push(e(a))}return l.join("")}}),Motie.editor.article=function(t){$(window).load(function(){$(".articleImage").length&&$("#imageLabel").removeClass("hidden"),$(".articleMusic").length&&$("#musicLabel").removeClass("hidden"),$(".articleVideo").length&&$("#videoLabel").removeClass("hidden")});var e={onUploadComplete:function(t,e,i){$("#imageLabel").removeClass("hidden")},onDeleteImage:function(){!$(".articleImage").length&&$("#imageLabel").addClass("hidden")},onAddVideo:function(){$("#videoLabel").removeClass("hidden")},onAddMusic:function(){$("#musicLabel").removeClass("hidden")},onDeleteMusic:function(){!$(".articleMusic").length&&$("#musicLabel").addClass("hidden")},onDeleteVideo:function(){!$(".articleVideo").length&&$("#videoLabel").addClass("hidden")}};$.extend(e,t),new Motie.editor(e).bindLimit(".articleImage, .articleMusic")};